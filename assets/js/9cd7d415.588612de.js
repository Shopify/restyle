"use strict";(self.webpackChunkrestyle=self.webpackChunkrestyle||[]).push([[218],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>f});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),p=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=p(r),d=o,f=m["".concat(s,".").concat(d)]||m[d]||u[d]||a;return r?n.createElement(f,i(i({ref:t},c),{},{components:r})):n.createElement(f,i({ref:t},c))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[m]="string"==typeof e?e:o,i[1]=l;for(var p=2;p<a;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},9354:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>m,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var n=r(7462),o=(r(7294),r(3905));const a={id:"defining-your-theme",title:"Defining your theme"},i=void 0,l={unversionedId:"fundamentals/defining-your-theme",id:"fundamentals/defining-your-theme",title:"Defining your theme",description:'Any project using this library should have a global theme object which specifies a set of values for spacing, colors, breakpoints, and more. These values are made available to Restyle components, so that you can for example write backgroundColor="cardPrimary" to use the named color from your theme. In fact, TypeScript enforces the backgroundColor property to only accept colors that have been defined in your theme, and autocompletes values for you in a modern editor.',source:"@site/docs/fundamentals/defining-your-theme.md",sourceDirName:"fundamentals",slug:"/fundamentals/defining-your-theme",permalink:"/restyle/fundamentals/defining-your-theme",draft:!1,editUrl:"https://github.com/shopify/restyle/edit/master/docusaurus/docs/fundamentals/defining-your-theme.md",tags:[],version:"current",lastUpdatedBy:"Marek Fo\u0159t",lastUpdatedAt:1680528719,formattedLastUpdatedAt:"Apr 3, 2023",frontMatter:{id:"defining-your-theme",title:"Defining your theme"},sidebar:"docs",previous:{title:"Fundamentals",permalink:"/restyle/fundamentals"},next:{title:"Colors",permalink:"/restyle/fundamentals/colors"}},s={},p=[],c={toc:p};function m(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Any project using this library should have a global theme object which specifies a set of values for spacing, colors, breakpoints, and more. These values are made available to Restyle components, so that you can for example write ",(0,o.kt)("inlineCode",{parentName:"p"},'backgroundColor="cardPrimary"')," to use the named color from your theme. In fact, TypeScript enforces the ",(0,o.kt)("inlineCode",{parentName:"p"},"backgroundColor")," property to ",(0,o.kt)("em",{parentName:"p"},"only")," accept colors that have been defined in your theme, and autocompletes values for you in a modern editor."),(0,o.kt)("p",null,"Below is an example of how a basic theme could look. Make sure to read the other sections in ",(0,o.kt)("a",{parentName:"p",href:"/fundamentals"},"Fundamentals")," for more details on how to set up your different theme values."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"import {createTheme} from '@shopify/restyle';\n\nconst palette = {\n  purpleLight: '#8C6FF7',\n  purplePrimary: '#5A31F4',\n  purpleDark: '#3F22AB',\n\n  greenLight: '#56DCBA',\n  greenPrimary: '#0ECD9D',\n  greenDark: '#0A906E',\n\n  black: '#0B0B0B',\n  white: '#F0F2F3',\n};\n\nconst theme = createTheme({\n  colors: {\n    mainBackground: palette.white,\n    cardPrimaryBackground: palette.purplePrimary,\n  },\n  spacing: {\n    s: 8,\n    m: 16,\n    l: 24,\n    xl: 40,\n  },\n});\n\nexport type Theme = typeof theme;\nexport default theme;\n")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Note: ",(0,o.kt)("inlineCode",{parentName:"em"},"createTheme")," doesn't do anything except enforcing the theme to have the same shape as the BaseTheme, but it preserves the types of your user specific values (e.g. what colors the theme has) so you don't lose typesafety as a result of the ",(0,o.kt)("inlineCode",{parentName:"em"},"{ [key:string]: any }")," in BaseTheme")),(0,o.kt)("p",null,"This theme should be passed to a ",(0,o.kt)("inlineCode",{parentName:"p"},"ThemeProvider")," at the top of your React tree:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"import {ThemeProvider} from '@shopify/restyle';\nimport theme from './theme';\n\nconst App = () => (\n  <ThemeProvider theme={theme}>{/* Rest of the app */}</ThemeProvider>\n);\n")))}m.isMDXComponent=!0}}]);