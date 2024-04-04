"use strict";(self.webpackChunkrestyle=self.webpackChunkrestyle||[]).push([[892],{3905:(e,n,r)=>{r.d(n,{Zo:()=>p,kt:()=>y});var t=r(7294);function a(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function o(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function d(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?o(Object(r),!0).forEach((function(n){a(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function i(e,n){if(null==e)return{};var r,t,a=function(e,n){if(null==e)return{};var r,t,a={},o=Object.keys(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||(a[r]=e[r]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=t.createContext({}),l=function(e){var n=t.useContext(c),r=n;return e&&(r="function"==typeof e?e(n):d(d({},n),e)),r},p=function(e){var n=l(e.components);return t.createElement(c.Provider,{value:n},e.children)},s="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},u=t.forwardRef((function(e,n){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),s=l(r),u=a,y=s["".concat(c,".").concat(u)]||s[u]||m[u]||o;return r?t.createElement(y,d(d({ref:n},p),{},{components:r})):t.createElement(y,d({ref:n},p))}));function y(e,n){var r=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=r.length,d=new Array(o);d[0]=u;var i={};for(var c in n)hasOwnProperty.call(n,c)&&(i[c]=n[c]);i.originalType=e,i[s]="string"==typeof e?e:a,d[1]=i;for(var l=2;l<o;l++)d[l]=r[l];return t.createElement.apply(null,d)}return t.createElement.apply(null,r)}u.displayName="MDXCreateElement"},4919:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>d,default:()=>s,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var t=r(7462),a=(r(7294),r(3905));const o={id:"dark-mode",title:"Implementing dark mode"},d=void 0,i={unversionedId:"guides/dark-mode",id:"guides/dark-mode",title:"Implementing dark mode",description:"Of course, no app is complete without a dark mode. Here a simple example of how you would implement it:",source:"@site/docs/guides/dark-mode.md",sourceDirName:"guides",slug:"/guides/dark-mode",permalink:"/restyle/guides/dark-mode",draft:!1,editUrl:"https://github.com/shopify/restyle/edit/master/docusaurus/docs/guides/dark-mode.md",tags:[],version:"current",lastUpdatedBy:"Guilherme Varandas",lastUpdatedAt:1712243566,formattedLastUpdatedAt:"Apr 4, 2024",frontMatter:{id:"dark-mode",title:"Implementing dark mode"},sidebar:"docs",previous:{title:"Guides",permalink:"/restyle/guides"},next:{title:"Running the fixture app",permalink:"/restyle/guides/fixture-app"}},c={},l=[],p={toc:l};function s(e){let{components:n,...r}=e;return(0,a.kt)("wrapper",(0,t.Z)({},p,r,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Of course, no app is complete without a dark mode. Here a simple example of how you would implement it:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},'import React, {useState} from \'react\';\nimport {Switch} from \'react-native\';\nimport {\n  ThemeProvider,\n  createBox,\n  createText,\n  createTheme,\n} from \'@shopify/restyle\';\n\nexport const palette = {\n  purple: \'#5A31F4\',\n  white: \'#FFF\',\n  black: \'#111\',\n  darkGray: \'#333\',\n  lightGray: \'#EEE\',\n};\n\nconst theme = createTheme({\n  spacing: {\n    s: 8,\n    m: 16,\n  },\n  colors: {\n    mainBackground: palette.lightGray,\n    mainForeground: palette.black,\n\n    primaryCardBackground: palette.purple,\n    secondaryCardBackground: palette.white,\n    primaryCardText: palette.white,\n    secondaryCardText: palette.black,\n  },\n  textVariants: {\n    defaults: {},\n    body: {\n      fontSize: 16,\n      lineHeight: 24,\n      color: \'mainForeground\',\n    },\n  },\n  cardVariants: {\n    defaults: {},\n    primary: {\n      backgroundColor: \'primaryCardBackground\',\n      shadowOpacity: 0.3,\n    },\n    secondary: {\n      backgroundColor: \'secondaryCardBackground\',\n      shadowOpacity: 0.1,\n    },\n  },\n});\n\ntype Theme = typeof theme;\n\nconst darkTheme: Theme = {\n  ...theme,\n  colors: {\n    ...theme.colors,\n    mainBackground: palette.black,\n    mainForeground: palette.white,\n\n    secondaryCardBackground: palette.darkGray,\n    secondaryCardText: palette.white,\n  },\n};\n\nconst Box = createBox<Theme>();\nconst Text = createText<Theme>();\n\nconst App = () => {\n  const [darkMode, setDarkMode] = useState(false);\n  return (\n    <ThemeProvider theme={darkMode ? darkTheme : theme}>\n      <Box padding="m" backgroundColor="mainBackground" flex={1}>\n        <Box\n          backgroundColor="primaryCardBackground"\n          margin="s"\n          padding="m"\n          flexGrow={1}\n        >\n          <Text variant="body" color="primaryCardText">\n            Primary Card\n          </Text>\n        </Box>\n        <Box\n          backgroundColor="secondaryCardBackground"\n          margin="s"\n          padding="m"\n          flexGrow={1}\n        >\n          <Text variant="body" color="secondaryCardText">\n            Secondary Card\n          </Text>\n        </Box>\n        <Box marginTop="m">\n          <Switch\n            value={darkMode}\n            onValueChange={(value: boolean) => setDarkMode(value)}\n          />\n        </Box>\n      </Box>\n    </ThemeProvider>\n  );\n};\n\nexport default App;\n')))}s.isMDXComponent=!0}}]);