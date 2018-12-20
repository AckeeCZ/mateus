![ackee|Mateus](https://img.ack.ee/ackee/image/github/js)

# Mateus

> Antd components as a form fields + redux-saga flow for easier handle of redux-form form's submit.

> Name of package *Mateus* refers to name of [the apostole Matthew](https://en.wikipedia.org/wiki/Matthew_the_Apostle) which is a patron of all office workers. Mateus is a [Portuguese equivalent](https://en.wikipedia.org/wiki/Mateus_(name)) for Matthew.


## Table of contents

* [Installation](#installation)
* [API](#api)
    * [Action creators](#action-creators)
    * [Sagas](#sagas)    
    * [Form fields](#form-fields)
        * [Text](#field-text)
        * [TextArea](#field-textarea)
        * [Select](#field-select)
        * [NumberInput](#field-numberinput)
        * [Switch](#field-switch)
        * [Slider](#field-slider)
        * [Radio](#field-radio)
        * [CheckboxGroup](#field-checkboxgroup)
        * [DatePicker & TimePicker](#field-pickers)

## <a name="installation"></a>Installation

Using npm:

`npm i -S @ackee/mateus`

## <a name="api"></a>API

### <a name="action-creators"></a>Action creators

#### <a name="submit-form-action-creator"></a>`submitForm(formId: string, submitActionCreator: () => object): function`

- `formId` Form unique identificator
- `submitActionCreator` Action creator for form specific submit action 
- Returns Form submit handler that is used for `handleSubmit` prop of `redux-form` `Form`.

    Example - use `submitForm` in `react-redux` container

    ```js
    import { connect } from 'react-redux';
    import { bindActionCreators, compose } from 'redux';

    import UserForm from './components/UserForm';

    const createUserAction = () => ({
        type: 'CREATE_USER'
    })

    const formId = 'createUserForm';

    export default compose(
        connect(
            (state) => ({
                initialValues: {
                },
            }),
            dispatch => ({
                onSubmit: bindActionCreators(
                    formActions.submitForm(formId, createUserAction),
                    dispatch,
                ),
            }),
        ),
        reduxForm({
            form: formId,
        }),
    )(UserForm);
    ```
---

### <a name="sagas"></a>Sagas

#### <a name="form-submit-saga"></a>`submitFormSaga(): void`

Form saga ensures you receive all neccessary data and methods (eg. for handling form flow) in form submit handler.
Just use it as your only saga, or in list of sagas.

In parallel with form submit saga, you will likely want to use [`submitForm`](#submit-form-action-creator) action creator.

Examples - Usage


```js
import { submitFormSaga as formSaga } from 'ackee-frontend-toolkit/sagas';

// main saga
export default function* () {
    yield all([
        // ... other sagas
        formSaga(),
    ]);
}
```

#### Complete example of using form saga flow

Handling form submit using our [submitForm saga](#form-submit-saga) in `redux-form` is easy and enable separation of concerns.

It's all divided into few simple steps

1. Plug `submitFormSaga` into main saga
2. Use [`submitForm`](#submit-form-action-creator) action as a handler of form submit
3. Catch action provided as a second parameter to `submitForm` and hadle it by custom saga.
4. Manage whole `redux-form` submit process, including startSubmit, stopSubmit and reset, in custom saga.

Example is a bit shortened and simplified:

```js
// config/index.js
export default {
    // ...
    forms: {
        addUser: 'addUserForm',
    }
    api: {
        user: '/api/v1/user',
    }
}
```
```js
// actions/user.js
export const addUserAction = () => ({
    type: 'ADD_USER'
})
```
```js
// components/UserForm.js
const UserForm = ({ handleSubmit, submitting }) => (
    <Form onSubmit={handleSubmit}>
        <Field
            disabled={submitting}
            id="firstname"
            name="firstname"
            component={Input}
            type="text"
        />
        <Field
            disabled={submitting}
            id="lastname"
            name="lastname"
            component={Input}
            type="text"
        />
        <button type="submit">Add user</button>
    </Form>
);

UserForm.propTypes = {
    // these props are automatically supplied by reduxForm()
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
};

export default UserForm;
```
```js
// containers/UserForm.js
import { submitForm } from '@ackee/mateus';
import { addUserAction } from '../actions/user';
import config from '../config';

export default compose(
    connect(
        (state) => ({
            initialValues: {},
        }),
        dispatch => ({
            onSubmit: bindActionCreators(
                submitForm(config.forms.addUser, addUserAction),
                dispatch,
            ),
        }),
    ),
    reduxForm({
        form: config.forms.addUser,
    }),
)(UserForm);
```
```js
// sagas/index.js
import { submitFormSaga } from '@ackee/mateus';
import userSaga from '../sagas/userSaga'; 
export default function* () {
    yield all([
        submitFormSaga(),
        userSaga(),
    ]);
}
```
```js
// sagas/userSaga.js
import config from '../config';

function* handleAddUserForm(action) {
    const { data, startSubmit, stopSubmit, reset } = action;

    yield startSubmit();
    try {
        yield api.post(
            config.api.user,
            {
                firstname: data.firstname,
                lastname: data.lastname,
            },
        );
        yield stopSubmit();
        yield reset();
    } catch (e) {
        const errors = { 'user add error': e };
        yield stopSubmit(errors);
    }
}

export default function* () {
    yield all([
        takeEvery('ADD_USER', handleAddUserForm),
    ]);
}
```
---

### <a name="form-fields"></a>Form fields

All form fields are available either as an Antd component (eg. [TextInput](https://ant.design/components/input/)) wrapped with
[FormItem](https://ant.design/components/form/#Form.Item) or the same, but enclosed into redux-form [Field](https://redux-form.com/7.4.2/docs/api/field.md/).

#### List of fields:

* [Text](#field-text)
* [TextArea](#field-textarea)
* [Select](#field-select)
* [NumberInput](#field-numberinput)
* [Switch](#field-switch)
* [Slider](#field-slider)
* [Radio](#field-radio)
* [CheckboxGroup](#field-checkboxgroup)
* [DatePicker & TimePicker](#field-pickers)
---
#### <a name="field-text"></a>Text

* `TextInput` accept Antd [`Input` props](https://ant.design/components/input/#Input).
* `TextField` accept same props as Input plus all the [props](https://redux-form.com/7.4.2/docs/api/field.md/#props-you-can-pass-to-code-field-code-) you can pass to redux-form Field.

    ```js
    import { TextInput, TextField } from '@ackee/mateus';
    ```

#### <a name="field-textarea"></a>TextArea

* `TextAreaInput` accept Antd [`TextArea` props](https://ant.design/components/input/#Input.TextArea).
* `TextAreaField` accept same props as Input plus all the [props](https://redux-form.com/7.4.2/docs/api/field.md/#props-you-can-pass-to-code-field-code-) you can pass to redux-form Field.

    ```js
    import { TextAreaInput, TextAreaField } from '@ackee/mateus';
    ```

#### <a name="field-select"></a>Select

* `SelectInput` accept Antd [`Select` props](https://ant.design/components/input/#Input.TextArea), but instead of passing options as children components, they'are passed as an array in props.

    Default name for that prop is `options` and it's shape is `{ label: ReactNode, value: string|number }`. The names can be changed by specifying `optionsKey`, `labelKey` or `valueKey` prop (look at example below).

* `SelectField` accept same props as Input plus all the [props](https://redux-form.com/7.4.2/docs/api/field.md/#props-you-can-pass-to-code-field-code-) you can pass to redux-form Field.

    ```js
    import { SelectInput, SelectField } from '@ackee/mateus';

    const select = (
        <SelectInput 
            options={[
                { label: 'Option1': value: 1 },
                { label: <span>Option2</span>: value: 2 },
            ]}
        />
    );

    const selectWithCustomNames = (
        <SelectInput 
            optionsKey="users"
            labelKey="name"
            valueKey="id"
            users={[
                { name: 'Anakin', id: 'siths1' },
                { name: 'Luke', id: 'jedis1' },
            ]}
        />
    );
    ```

#### <a name="field-numberinput"></a>NumberInput

* `NumberInput` accept Antd [`InputNumber` props](https://ant.design/components/input-number/#API).
* `NumberField` accept same props as Input plus all the [props](https://redux-form.com/7.4.2/docs/api/field.md/#props-you-can-pass-to-code-field-code-) you can pass to redux-form Field.

    ```js
    import { NumberInput, NumberField } from '@ackee/mateus';
    ```

#### <a name="field-switch"></a>Switch

* `SwitchInput` accept Antd [`Switch` props](https://ant.design/components/switch/#API).
* `SwitchField` accept same props as Input plus all the [props](https://redux-form.com/7.4.2/docs/api/field.md/#props-you-can-pass-to-code-field-code-) you can pass to redux-form Field.

    ```js
    import { SwitchInput, SwitchField } from '@ackee/mateus';
    ```

#### <a name="field-slider"></a>Slider

* `SliderInput` accept Antd [`Slider` props](https://ant.design/components/slider/#API).
* `SliderField` accept same props as Input plus all the [props](https://redux-form.com/7.4.2/docs/api/field.md/#props-you-can-pass-to-code-field-code-) you can pass to redux-form Field.

    ```js
    import { SliderInput, SliderField } from '@ackee/mateus';
    ```

#### <a name="field-radio"></a>Radio

This is a bit confusing, because `RadioInput` is actually `RadioGroup` - in most cases we want to render group of radios to let user select one option so we don't need an individual `Radio`. If from any reason you realy need only one `Radio` without `RadioGroup` just feel free to use it directly from `antd`.

* `RadioInput` accept Antd [`RadioGroup` props](https://ant.design/components/radio/#RadioGroup), but with several differencies
    * the definition `options` prop is a bit changed. It lacks `disabled` field so the shape is just `{ label: ReactNode, value: string|number }`.
    * on the other hand, as same as for [`Select`](#field-select) you can specify custom names for props and the shape keys by specifying `optionsKey`, `labelKey` or `valueKey` prop (look at example below).
    * you can pass `button` prop of type boolean that force use of radio buttons instead of plain radios.

* `RadioField` accept same props as Input plus all the [props](https://redux-form.com/7.4.2/docs/api/field.md/#props-you-can-pass-to-code-field-code-) you can pass to redux-form Field.

    ```js
    import { RadioInput, RadioField } from '@ackee/mateus';

    const selectYourFavourite = (
        <RadioInput 
            optionsKey="southPark"
            labelKey="name"
            valueKey="color"
            southPark={[
                { name: 'Kenny', color: 'orange' },
                { name: 'Cartman', color: 'fat' },
                { name: 'Stan', color: 'blue' },
                { name: 'Kyle', color: 'green' },
            ]}
            button
        />
    );
    ```

#### <a name="field-checkboxgroup"></a>CheckboxGroup

* `CheckboxGroupInput` accept Antd [`CheckboxGroup` props](https://ant.design/components/checkbox/#Checkbox-Group).
* `CheckboxGroupField` accept same props as Input plus all the [props](https://redux-form.com/7.4.2/docs/api/field.md/#props-you-can-pass-to-code-field-code-) you can pass to redux-form Field.

    ```js
    import { CheckboxGroupInput, CheckboxGroupField } from '@ackee/mateus';
    ```

#### <a name="field-pickers"></a>DatePicker & TimePicker

* Both pickers accept props from [shared API](https://ant.design/components/date-picker/#Common-API) plus:
    * `DatePickerInput` accept Antd [`DatePicker` props](https://ant.design/components/date-picker/#DatePicker).
    * `TimePickerInput` accept Antd [`TimePicker` props](https://ant.design/components/time-picker/#API).
    * both accept `displayFormat` prop which is the same as `format` prop defined in picker's API. But since redux-form `Field` has also `format` prop and so Input's one would be overriden when using `DatePickerField` or `TimePickerField`, wee need to provide an alternative.
* `DatePickerField`/`TimePickerField` accept same props as `DatePickerInput`/`TimePickerInput` plus all the [props](https://redux-form.com/7.4.2/docs/api/field.md/#props-you-can-pass-to-code-field-code-) you can pass to redux-form Field.

    ```js
    import { DatePickerInput, DatePickerField, TimePickerInput, TimePickerField } from '@ackee/mateus';
    ```

#### <a name="pickerenhancer"></a>pickerEnhancer

* TBD

    ```js
    import { pickerEnhancer } from '@ackee/mateus';
    ```

