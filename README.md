![ackee|Mateus](https://img.ack.ee/ackee/image/github/js)

# Mateus

> Antd components as a form fields + redux-saga flow for easier handle of redux-form form's submit.

> Name of package *Mateus* refers to name of [the apostole Matthew](https://en.wikipedia.org/wiki/Matthew_the_Apostle) which is a patron of all office workers. Mateus is a [Portuguese equivalent](https://en.wikipedia.org/wiki/Mateus_(name)) for Matthew.


## Table of contents

* [Instalation](#instalation)
* [API](#api)
    * [Action creators](#action-creators)
    * [Sagas](#sagas)    

## <a name="instalation"></a>Instalation

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

