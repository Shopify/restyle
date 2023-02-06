interface VariationTracedResults {
  [variation: string]: TracedResults;
}

interface MappedTracedResults {
  [key: string]: VariationTracedResults;
}
interface TracedResults {
  lastStart: number;
  accumulatedTime: number;
  count: number;
  averageTime: number;
}

function tracerHelper() {
  const paddedString = (str: string, length: number): string => {
    return str + ' '.repeat(Math.max(0, length - str.length));
  };

  const printResults = (dict: MappedTracedResults) => {
    print('Printing results');
    print(
      `${paddedString('Name', 35)} | ${paddedString('Avg', 7)} | ${paddedString(
        '#',
        5,
      )} | ${paddedString('Acc', 10)} | ${paddedString(
        '% ⬆️',
        9,
      )} | Variation acc`,
    );
    print('-'.repeat(100));
    Object.keys(dict)
      .sort((first, second) =>
        dict[first].control.accumulatedTime >
        dict[second].control.accumulatedTime
          ? -1
          : 1,
      )
      .forEach(name => {
        const {averageTime, count, accumulatedTime} = dict[name].control;
        const paddedCount = paddedString(count.toString(), 5);
        const paddedAverageTime = paddedString(
          `${Math.round(averageTime)}ms`,
          7,
        );
        const paddedAccumulated = paddedString(
          `${Math.round(accumulatedTime)}ms`,
          10,
        );

        Object.keys(dict[name]).forEach(variation => {
          let nameToPrint;
          if (variation === 'control') {
            nameToPrint = paddedString(name, 35);
          } else {
            nameToPrint = paddedString(' '.repeat(3) + variation, 35);
          }
          const message = `${nameToPrint} | ${paddedAverageTime} | ${paddedCount} | ${paddedAccumulated} | `;
          const variationObj = dict[name][variation];
          const variationAccumulated = variationObj.accumulatedTime || 0.001;
          const percentage =
            accumulatedTime > 0 ? accumulatedTime / variationAccumulated : 0;
          const paddedDifference = paddedString(
            `${Math.round((1 - percentage) * 100)}%`,
            7,
          );
          print(`${message} ${paddedDifference} | ${variationAccumulated}ms`);
        });
      });
    print('-'.repeat(100));
  };

  const print = (message: string) => {
    console.log(message);
  };

  return {
    paddedString,
    printResults,
    print,
  };
}

function tracer() {
  const dict: MappedTracedResults = {};
  const helper = tracerHelper();
  let scheduledPrint = false;

  const start = (name: string, variation?: string) => {
    const lastStart = Date.now();
    const variationOrControl: string = variation || 'control';
    if (
      dict[name] === undefined ||
      dict[name][variationOrControl] === undefined
    ) {
      const obj = {
        lastStart,
        accumulatedTime: 0,
        count: 0,
        averageTime: 0,
      };
      if (dict[name] === undefined) {
        dict[name] = {};
      }
      dict[name][variationOrControl] = obj;
    } else {
      dict[name][variationOrControl].lastStart = lastStart;
    }
  };

  const stop = (name: string, variation?: string) => {
    const variationOrControl: string = variation || 'control';

    const lastStart = dict[name][variationOrControl].lastStart;
    if (lastStart === undefined) {
      helper.print('You need to call start before stop');
    }
    const obj = dict[name][variationOrControl];
    const acccumulatedTime = Date.now() - lastStart;
    obj.accumulatedTime += acccumulatedTime;
    obj.count += 1;
    obj.averageTime = obj.accumulatedTime / obj.count;
    dict[name][variationOrControl] = obj;
    schedulePrintResults();
  };

  const schedulePrintResults = () => {
    if (!scheduledPrint) {
      scheduledPrint = true;
      setTimeout(() => {
        helper.printResults(dict);
        scheduledPrint = false;
        schedulePrintResults();
      }, 5000);
    }
  };

  return {
    start,
    stop,
  };
}

export const tracerInstance = Object.freeze(tracer());
