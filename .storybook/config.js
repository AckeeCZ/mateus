import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { setOptions } from '@storybook/addon-options';

const req = require.context('../src', true, /\.story\.(ts|js)x?$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator((story, context) => withInfo('')(story)(context));

setOptions({
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/,
});

configure(loadStories, module);
