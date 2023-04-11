"use strict";(self.webpackChunkrestyle=self.webpackChunkrestyle||[]).push([[444],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),c=s(r),y=a,f=c["".concat(l,".").concat(y)]||c[y]||d[y]||i;return r?n.createElement(f,o(o({ref:t},u),{},{components:r})):n.createElement(f,o({ref:t},u))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=y;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p[c]="string"==typeof e?e:a,o[1]=p;for(var s=2;s<i;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},3709:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>p,toc:()=>s});var n=r(7462),a=(r(7294),r(3905));const i={id:"fixture-app",title:"Running the fixture app"},o=void 0,p={unversionedId:"guides/fixture-app",id:"guides/fixture-app",title:"Running the fixture app",description:"The fixture app serves as a playground to either learn to use Restyle, test changes to the library, or simply prototype ideas. To get it running, follow the steps below:",source:"@site/docs/guides/fixture-app.md",sourceDirName:"guides",slug:"/guides/fixture-app",permalink:"/restyle/guides/fixture-app",draft:!1,editUrl:"https://github.com/shopify/restyle/edit/master/docusaurus/docs/guides/fixture-app.md",tags:[],version:"current",lastUpdatedBy:"Sebastian Ekstr\xf6m",lastUpdatedAt:1681217477,formattedLastUpdatedAt:"Apr 11, 2023",frontMatter:{id:"fixture-app",title:"Running the fixture app"},sidebar:"docs",previous:{title:"Implementing dark mode",permalink:"/restyle/guides/dark-mode"},next:{title:"Getting Setup With the Shopify Design System",permalink:"/restyle/guides/shopify-design-system"}},l={},s=[{value:"Making changes to Restyle",id:"making-changes-to-restyle",level:3}],u={toc:s};function c(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"The fixture app serves as a playground to either learn to use Restyle, test changes to the library, or simply prototype ideas. To get it running, follow the steps below:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"First, run ",(0,a.kt)("inlineCode",{parentName:"p"},"yarn up")," to install all the Restyle and fixture app dependencies.")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Next, run ",(0,a.kt)("inlineCode",{parentName:"p"},"yarn start")," to start Metro.")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Lastly, run ",(0,a.kt)("inlineCode",{parentName:"p"},"yarn run-ios")," to start the app on iOS, and ",(0,a.kt)("inlineCode",{parentName:"p"},"yarn run-android")," to start the app on Android."))),(0,a.kt)("p",null,"Your local iOS simulator and Android emulator should open automatically. If they do not, please follow React Native's ",(0,a.kt)("a",{parentName:"p",href:"https://reactnative.dev/docs/environment-setup"},"Setting up the development environment"),"."),(0,a.kt)("h3",{id:"making-changes-to-restyle"},"Making changes to Restyle"),(0,a.kt)("p",null,"When making changes to Restyle (the code in ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/Shopify/restyle/tree/master/src"},"/src"),"), you'll need to run ",(0,a.kt)("inlineCode",{parentName:"p"},"yarn build")," to use the latest Restyle build in the fixture app."))}c.isMDXComponent=!0}}]);