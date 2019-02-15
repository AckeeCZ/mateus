import React from 'react';
import { shallow } from 'enzyme';
import wrapWithField from '../wrapWithField';

describe('wrapWithField HOC', () => {
    const DummyComponent = () => <div />;

    it('should not share inject props across component instances', () => {
        const DummyField = wrapWithField<{ extraProp?: string }>(DummyComponent, { myProp: true });

        const wrapper = shallow(<DummyField name="test" extraProp="I am only for first wrapper" />);
        const wrapper2 = shallow(<DummyField name="test" />);

        expect(wrapper.prop('myProp')).toBe(true);
        expect(wrapper.prop('extraProp')).toBe('I am only for first wrapper');

        expect(wrapper2.prop('myProp')).toBe(true);
        expect(wrapper2.prop('extraProp')).toBeUndefined();
    });
});
