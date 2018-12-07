import Button from '@enact/moonstone/Button';
import kind from '@enact/core/kind';
import handle from '@enact/core/handle';
import {Panel, Header} from '@enact/moonstone/Panels';
import LS2Request from '@enact/webos/LS2Request';
import React from 'react';


const handler = handle(
  // eslint-disable-next-line
  (ev, props) => {
    new LS2Request().send({
      service: 'luna://com.webos.service.db/',
      method: 'putKind',
      parameters: {
        id: 'com.domain.app:1',
        owner: 'com.domain.app',
        indexes: [{name: 'sample', props: [{name: 'sample'}]}]
      }
    });
    let start = new Date().getTime();

    for(let i=0; i<1000; i++) {
      new LS2Request().send({
        service: 'luna://com.webos.service.db/',
        method: 'put',
        parameters: {
          objects: [
            {
              "_kind": 'com.domain.app:1',
              sample: 'sample'+i,
            }
          ]
        }
      });
    }

    let elapsed = new Date().getTime() - start;
    console.warn("l5vd5 put : " + elapsed);
    let start2 = new Date().getTime();

    for(let i=0; i<1000; i++) {
      new LS2Request().send({
        service: 'luna://com.webos.service.db/',
        method: 'find',
        parameters: {
          query: {
            from: 'com.domain.app:1',
            where: [
              {
                prop: 'sample',
                op: '=',
                val: 'sample'+i,
              }
            ]
          }
        }
      });
    }

    let elapsed2 = new Date().getTime() - start2;
    console.warn("l5vd5 find  : " + elapsed2);
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
