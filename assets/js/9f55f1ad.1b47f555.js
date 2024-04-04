"use strict";(self.webpackChunkrestyle=self.webpackChunkrestyle||[]).push([[433],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>h});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),p=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=p(r),m=a,h=u["".concat(s,".").concat(m)]||u[m]||d[m]||o;return r?n.createElement(h,l(l({ref:t},c),{},{components:r})):n.createElement(h,l({ref:t},c))}));function h(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,l=new Array(o);l[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[u]="string"==typeof e?e:a,l[1]=i;for(var p=2;p<o;p++)l[p]=r[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},38:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>p});var n=r(7462),a=(r(7294),r(3905));const o={id:"colors",title:"Colors"},l=void 0,i={unversionedId:"fundamentals/colors",id:"fundamentals/colors",title:"Colors",description:"When working with colors in a design system a common pattern is to have a palette including a number of base colors with darker and lighter shades, see for example the Polaris Color Palette.",source:"@site/docs/fundamentals/colors.md",sourceDirName:"fundamentals",slug:"/fundamentals/colors",permalink:"/restyle/fundamentals/colors",draft:!1,editUrl:"https://github.com/shopify/restyle/edit/master/docusaurus/docs/fundamentals/colors.md",tags:[],version:"current",lastUpdatedBy:"Guilherme Varandas",lastUpdatedAt:1712243566,formattedLastUpdatedAt:"Apr 4, 2024",frontMatter:{id:"colors",title:"Colors"},sidebar:"docs",previous:{title:"Defining your theme",permalink:"/restyle/fundamentals/defining-your-theme"},next:{title:"Spacing",permalink:"/restyle/fundamentals/spacing"}},s={},p=[],c={toc:p};function u(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"When working with colors in a design system a common pattern is to have a palette including a number of base colors with darker and lighter shades, see for example the ",(0,a.kt)("a",{parentName:"p",href:"https://polaris.shopify.com/design/colors#color-palette"},"Polaris Color Palette"),"."),(0,a.kt)("p",null,"This palette should preferrably not be directly included as values in the theme. The naming of colors in the theme object should instead be used to assign semantic meaning to the palette, see this example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"const palette = {\n  purpleLight: '#8C6FF7',\n  purplePrimary: '#5A31F4',\n  purpleDark: '#3F22AB',\n\n  greenLight: '#56DCBA',\n  greenPrimary: '#0ECD9D',\n  greenDark: '#0A906E',\n\n  black: '#0B0B0B',\n  white: '#F0F2F3',\n};\n\nconst theme = createTheme({\n  colors: {\n    mainBackground: palette.white,\n    mainForeground: palette.black,\n    cardPrimaryBackground: palette.purplePrimary,\n    buttonPrimaryBackground: palette.purplePrimary,\n  },\n});\n")),(0,a.kt)("p",null,"Taking the time to define these semantic meanings comes with a number of benefits:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"It's easy to understand where and in what context colors are applied throughout the app"),(0,a.kt)("li",{parentName:"ul"},"If changes are made to the palette (e.g. the purple colors are changed to a shade of blue instead), we only have to update what the semantic names point to instead of updating all references to ",(0,a.kt)("inlineCode",{parentName:"li"},"purplePrimary")," throughout the app."),(0,a.kt)("li",{parentName:"ul"},"Even though ",(0,a.kt)("inlineCode",{parentName:"li"},"cardPrimaryBackground")," and ",(0,a.kt)("inlineCode",{parentName:"li"},"buttonPrimaryBackground")," point to the same color in the example above, deciding that buttons should instead be green (while cards remain purple) becomes a trivial change."),(0,a.kt)("li",{parentName:"ul"},"A theme can easily be ",(0,a.kt)("a",{parentName:"li",href:"/guides/dark-mode"},"swapped at runtime"),".")))}u.isMDXComponent=!0}}]);