import Button from '@enact/moonstone/Button';
import kind from '@enact/core/kind';
import handle from '@enact/core/handle';
import {Panel, Header} from '@enact/moonstone/Panels';
import LS2Request from '@enact/webos/LS2Request';
import React from 'react';


const handler = handle(
  // eslint-disable-next-line
  (ev, props) => {
    console.log("Click");
    new LS2Request().send({
      service: 'luna://com.webos.service.db/',
      method: 'putKind',
      parameter: {
        id: 'com.webos.service.test:1',
        owner: 'com.webos.service.test',
        indexes: [{name: 'sample', props: [{name: 'se'}]}]
      }
    });
  }
);

const MainPanel = kind({
	name: 'MainPanel',


	render: (props) => (
		<Panel {...props}>
			<Header title="Hello world!" />
			<Button onClick={handler}>Click me</Button>
		</Panel>
	)
});

export default MainPanel;
