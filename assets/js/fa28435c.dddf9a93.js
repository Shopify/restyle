"use strict";(self.webpackChunkrestyle=self.webpackChunkrestyle||[]).push([[263],{3905:(t,e,n)=>{n.d(e,{Zo:()=>s,kt:()=>y});var r=n(7294);function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function i(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},l=Object.keys(t);for(r=0;r<l.length;r++)n=l[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(r=0;r<l.length;r++)n=l[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}var p=r.createContext({}),d=function(t){var e=r.useContext(p),n=e;return t&&(n="function"==typeof t?t(e):o(o({},e),t)),n},s=function(t){var e=d(t.components);return r.createElement(p.Provider,{value:e},t.children)},m="mdxType",u={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},c=r.forwardRef((function(t,e){var n=t.components,a=t.mdxType,l=t.originalType,p=t.parentName,s=i(t,["components","mdxType","originalType","parentName"]),m=d(n),c=a,y=m["".concat(p,".").concat(c)]||m[c]||u[c]||l;return n?r.createElement(y,o(o({ref:e},s),{},{components:n})):r.createElement(y,o({ref:e},s))}));function y(t,e){var n=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var l=n.length,o=new Array(l);o[0]=c;var i={};for(var p in e)hasOwnProperty.call(e,p)&&(i[p]=e[p]);i.originalType=t,i[m]="string"==typeof t?t:a,o[1]=i;for(var d=2;d<l;d++)o[d]=n[d];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},6478:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>p,contentTitle:()=>o,default:()=>m,frontMatter:()=>l,metadata:()=>i,toc:()=>d});var r=n(7462),a=(n(7294),n(3905));const l={id:"restyle-functions",title:"Restyle functions"},o=void 0,i={unversionedId:"fundamentals/restyle-functions",id:"fundamentals/restyle-functions",title:"Restyle functions",description:"Restyle functions are the bread and butter of Restyle. They specify how props should be mapped to values in a resulting style object, that can then be passed down to a React Native component. The props support responsive values and can be mapped to values in your theme.",source:"@site/docs/fundamentals/restyle-functions.md",sourceDirName:"fundamentals",slug:"/fundamentals/restyle-functions",permalink:"/restyle/fundamentals/restyle-functions",draft:!1,editUrl:"https://github.com/shopify/restyle/edit/master/docusaurus/docs/fundamentals/restyle-functions.md",tags:[],version:"current",lastUpdatedBy:"Guilherme Varandas",lastUpdatedAt:1742414201,formattedLastUpdatedAt:"Mar 19, 2025",frontMatter:{id:"restyle-functions",title:"Restyle functions"},sidebar:"docs",previous:{title:"Overriding styles",permalink:"/restyle/fundamentals/overriding-styles"},next:{title:"Components",permalink:"/restyle/fundamentals/components"}},p={},d=[{value:"Predefined Restyle functions",id:"predefined-restyle-functions",level:2},{value:"Custom Restyle functions",id:"custom-restyle-functions",level:2}],s={toc:d};function m(t){let{components:e,...n}=t;return(0,a.kt)("wrapper",(0,r.Z)({},s,n,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Restyle functions are the bread and butter of Restyle. They specify how props should be mapped to values in a resulting style object, that can then be passed down to a React Native component. The props support responsive values and can be mapped to values in your theme."),(0,a.kt)("h2",{id:"predefined-restyle-functions"},"Predefined Restyle functions"),(0,a.kt)("p",null,"The Restyle library comes with a number of predefined Restyle functions for your convenience. Properties within brackets are aliases / shorthands for the preceding prop name."),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Restyle Function"),(0,a.kt)("th",{parentName:"tr",align:null},"Props"),(0,a.kt)("th",{parentName:"tr",align:null},"Theme Key"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"backgroundColor"),(0,a.kt)("td",{parentName:"tr",align:null},"backgroundColor ","[bg]"),(0,a.kt)("td",{parentName:"tr",align:null},"colors")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"color"),(0,a.kt)("td",{parentName:"tr",align:null},"color"),(0,a.kt)("td",{parentName:"tr",align:null},"colors")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"opacity"),(0,a.kt)("td",{parentName:"tr",align:null},"opacity"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("em",{parentName:"td"},"none"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"visible"),(0,a.kt)("td",{parentName:"tr",align:null},"display (maps ",(0,a.kt)("inlineCode",{parentName:"td"},"true")," / ",(0,a.kt)("inlineCode",{parentName:"td"},"false")," to ",(0,a.kt)("inlineCode",{parentName:"td"},"flex")," / ",(0,a.kt)("inlineCode",{parentName:"td"},"none"),")"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("em",{parentName:"td"},"none"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"spacing"),(0,a.kt)("td",{parentName:"tr",align:null},"margin ","[m]",", marginTop ","[mt]",", marginRight ","[mr]",", marginBottom ","[mb]",", marginLeft ","[ml]",", marginStart ","[ms]",", marginEnd","[me]",", marginHorizontal ","[mx]",", marginVertical ","[my]",", padding ","[p]",", paddingTop ","[pt]",", paddingRight ","[pr]",", paddingBottom ","[pb]",", paddingLeft ","[pl]",", paddingStart ","[ps]",", paddingEnd ","[pe]",", paddingHorizontal ","[px]",", paddingVertical ","[py]",", gap ","[g]",", rowGap ","[rG]",", columnGap ","[cG]"),(0,a.kt)("td",{parentName:"tr",align:null},"spacing")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"layout"),(0,a.kt)("td",{parentName:"tr",align:null},"width, height, minWidth, maxWidth, minHeight, maxHeight, overflow, aspectRatio, alignContent, alignItems, alignSelf, justifyContent, flex, flexBasis, flexDirection, flexGrow, flexShrink, flexWrap"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("em",{parentName:"td"},"none"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"position"),(0,a.kt)("td",{parentName:"tr",align:null},"position, top, right, bottom, left, start, end"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("em",{parentName:"td"},"none"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"position"),(0,a.kt)("td",{parentName:"tr",align:null},"zIndex"),(0,a.kt)("td",{parentName:"tr",align:null},"zIndices")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"border"),(0,a.kt)("td",{parentName:"tr",align:null},"borderBottomWidth, borderLeftWidth, borderRightWidth, borderStartWidth, borderEndWidth, borderStyle, borderTopWidth, borderWidth"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("em",{parentName:"td"},"none"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"border"),(0,a.kt)("td",{parentName:"tr",align:null},"borderColor, borderTopColor, borderRightColor, borderLeftColor, borderStartColor, borderEndColor, borderBottomColor"),(0,a.kt)("td",{parentName:"tr",align:null},"colors")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"border"),(0,a.kt)("td",{parentName:"tr",align:null},"borderRadius, borderBottomLeftRadius, borderBottomRightRadius, borderBottomStartRadius, borderBottomEndRadius, borderTopLeftRadius, borderTopRightRadius, borderTopStartRadius, borderTopEndRadius"),(0,a.kt)("td",{parentName:"tr",align:null},"borderRadii")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"shadow"),(0,a.kt)("td",{parentName:"tr",align:null},"shadowOpacity, shadowOffset, shadowRadius, elevation"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("em",{parentName:"td"},"none"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"shadow"),(0,a.kt)("td",{parentName:"tr",align:null},"shadowColor"),(0,a.kt)("td",{parentName:"tr",align:null},"colors")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"textShadow"),(0,a.kt)("td",{parentName:"tr",align:null},"textShadowOffset, textShadowRadius"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("em",{parentName:"td"},"none"))),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"textShadow"),(0,a.kt)("td",{parentName:"tr",align:null},"textShadowColor"),(0,a.kt)("td",{parentName:"tr",align:null},"colors")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"typography"),(0,a.kt)("td",{parentName:"tr",align:null},"fontFamily, fontSize, fontStyle, fontWeight, includeFontPadding, fontVariant, letterSpacing, lineHeight, textAlign, textAlignVertical, textDecorationColor, textDecorationLine, textDecorationStyle, textTransform, verticalAlign, writingDirection"),(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("em",{parentName:"td"},"none"))))),(0,a.kt)("h2",{id:"custom-restyle-functions"},"Custom Restyle functions"),(0,a.kt)("p",null,"To define your own Restyle function, use the ",(0,a.kt)("inlineCode",{parentName:"p"},"createRestyleFunction")," helper:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import {createRestyleFunction, createRestyleComponent} from '@shopify/restyle'\nconst transparency = createRestyleFunction({\n  property: 'transparency',\n  styleProperty: 'opacity',\n  transform: ({value}: {value: number}) => 1 - value,\n});\n\nconst TransparentComponent = createRestyleComponent([transparency])\n\n<TransparentComponent transparency={0.5} />\n")),(0,a.kt)("p",null,"Arguments:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"property"),": The name of the component prop that the function will receive the value of."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"styleProperty"),": The name of the property in the style object to map to. Defaults to the value of ",(0,a.kt)("inlineCode",{parentName:"li"},"property"),"."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"transform({value, theme, themeKey})"),": An optional function that transforms the value of the prop to the value that will be inserted into the style object."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"themeKey"),": An optional key in the theme to map values from, e.g. ",(0,a.kt)("inlineCode",{parentName:"li"},"colors"),".")))}m.isMDXComponent=!0}}]);