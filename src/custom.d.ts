// custom type definition file for imports of for example App.module.css
declare module '*.css' {
    const css: { [key: string]: string };  // because scoped class names look like: {container: AUTOGENERATEDID}
    export default css;
}
declare module '*.svg' {
    const ReactComponent: React.ComponentType<React.SVGAttributes<SVGAElement>>
    export default ReactComponent;
}