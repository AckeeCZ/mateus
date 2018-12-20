// this is temporary solution for missing redux-form-antd definitions
declare module 'redux-form-antd' {
    type MapFnc = (props: {[key: string]: any}) => {[key: string]: any};
    type ReduceFnc<P1, P2> = (allProps: P1, props: P2) => {[key: string]: any};

    const reduxFormAntd: {
        TextField: React.ComponentType<any>;
        TextAreaField: React.ComponentType<any>;
        NumberField: React.ComponentType<any>;
        SliderField: React.ComponentType<any>;
        SelectField: React.ComponentType<any>;
        SwitchField: React.ComponentType<any>;
        RadioField: React.ComponentType<any>;

        customMap: <P1, P2>(reduceFnc: ReduceFnc<P1, P2>) => MapFnc;
        createComponent: <P>(antComponent: React.ComponentType, mapFnc: MapFnc) => React.ComponentType<P>;
    };
    export = reduxFormAntd;
}
