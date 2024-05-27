"use strict";(self.webpackChunkrestyle=self.webpackChunkrestyle||[]).push([[641],{3905:(e,n,t)=>{t.d(n,{Zo:()=>l,kt:()=>y});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=r.createContext({}),i=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},l=function(e){var n=i(e.components);return r.createElement(c.Provider,{value:n},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,s=e.originalType,c=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),m=i(t),d=o,y=m["".concat(c,".").concat(d)]||m[d]||u[d]||s;return t?r.createElement(y,a(a({ref:n},l),{},{components:t})):r.createElement(y,a({ref:n},l))}));function y(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var s=t.length,a=new Array(s);a[0]=d;var p={};for(var c in n)hasOwnProperty.call(n,c)&&(p[c]=n[c]);p.originalType=e,p[m]="string"==typeof e?e:o,a[1]=p;for(var i=2;i<s;i++)a[i]=t[i];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},9482:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>m,frontMatter:()=>s,metadata:()=>p,toc:()=>i});var r=t(7462),o=(t(7294),t(3905));const s={id:"custom-components",title:"Custom components"},a=void 0,p={unversionedId:"fundamentals/components/custom-components",id:"fundamentals/components/custom-components",title:"Custom components",description:"If you want to create your own component similar to Box or Text, but decide",source:"@site/docs/fundamentals/components/custom-components.md",sourceDirName:"fundamentals/components",slug:"/fundamentals/components/custom-components",permalink:"/restyle/fundamentals/components/custom-components",draft:!1,editUrl:"https://github.com/shopify/restyle/edit/master/docusaurus/docs/fundamentals/components/custom-components.md",tags:[],version:"current",lastUpdatedBy:"Talha Naqvi",lastUpdatedAt:1716846245,formattedLastUpdatedAt:"May 27, 2024",frontMatter:{id:"custom-components",title:"Custom components"},sidebar:"docs",previous:{title:"Predefined components",permalink:"/restyle/fundamentals/components/predefined-components"},next:{title:"Guides",permalink:"/restyle/guides"}},c={},i=[],l={toc:i};function m(e){let{components:n,...t}=e;return(0,o.kt)("wrapper",(0,r.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"If you want to create your own component similar to ",(0,o.kt)("inlineCode",{parentName:"p"},"Box")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"Text"),", but decide\nyourself which ",(0,o.kt)("a",{parentName:"p",href:"/fundamentals/restyle-functions#predefined-restyle-functions"},"predefined Restyle functions")," to use, use the\n",(0,o.kt)("inlineCode",{parentName:"p"},"createRestyleComponent")," helper:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"import {\n  createRestyleComponent,\n  createVariant,\n  spacing,\n  SpacingProps,\n  VariantProps,\n} from '@shopify/restyle';\nimport {Theme} from './theme';\n\ntype Props = SpacingProps<Theme> & VariantProps<Theme, 'cardVariants'>;\nconst Card = createRestyleComponent<Props, Theme>([\n  spacing,\n  createVariant({themeKey: 'cardVariants'}),\n]);\n\nexport default Card;\n")),(0,o.kt)("p",null,"For more advanced components, you may want to instead use the ",(0,o.kt)("inlineCode",{parentName:"p"},"useRestyle")," hook:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"import {TouchableOpacity, View} from 'react-native';\nimport {\n  useRestyle,\n  spacing,\n  border,\n  backgroundColor,\n  SpacingProps,\n  BorderProps,\n  BackgroundColorProps,\n  composeRestyleFunctions,\n} from '@shopify/restyle';\n\nimport Text from './Text';\nimport {Theme} from './theme';\n\ntype RestyleProps = SpacingProps<Theme> &\n  BorderProps<Theme> &\n  BackgroundColorProps<Theme>;\n\nconst restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([\n  spacing,\n  border,\n  backgroundColor,\n]);\n\ntype Props = RestyleProps & {\n  onPress: () => void;\n  label: string;\n};\n\nconst Button = ({onPress, label, ...rest}: Props) => {\n  const props = useRestyle(restyleFunctions, rest);\n\n  return (\n    <TouchableOpacity onPress={onPress}>\n      <View {...props}>\n        <Text variant=\"buttonLabel\">{label}</Text>\n      </View>\n    </TouchableOpacity>\n  );\n};\n")))}m.isMDXComponent=!0}}]);