/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useState, useRef, useCallback } from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import Button from 'src/components/Button';
import { CronPicker, CronError } from 'src/components/CronPicker';
import Modal from './Modal';
import Tabs, { EditableTabs } from './Tabs';
import { Tooltip as AntdTooltip } from './Tooltip';
import { Menu, Input, Divider } from '.';
import { Dropdown } from './Dropdown';
import InfoTooltip from './InfoTooltip';

export default {
  title: 'Common components',
  decorators: [withKnobs],
};

export const StyledModal = () => (
  <Modal
    disablePrimaryButton={false}
    onHandledPrimaryAction={action('Primary action')}
    primaryButtonName="Danger"
    primaryButtonType="danger"
    show
    onHide={action('hidden')}
    title="I'm a modal!"
  >
    <div>hi!</div>
  </Modal>
);

export const StyledTabs = () => (
  <Tabs
    defaultActiveKey="1"
    centered={boolean('Center tabs', false)}
    fullWidth={boolean('Full width', true)}
  >
    <Tabs.TabPane
      tab="Tab 1"
      key="1"
      disabled={boolean('Tab 1 disabled', false)}
    >
      Tab 1 Content!
    </Tabs.TabPane>
    <Tabs.TabPane
      tab="Tab 2"
      key="2"
      disabled={boolean('Tab 2 disabled', false)}
    >
      Tab 2 Content!
    </Tabs.TabPane>
  </Tabs>
);

export const StyledEditableTabs = () => (
  <EditableTabs
    defaultActiveKey="1"
    centered={boolean('Center tabs', false)}
    fullWidth={boolean('Full width', true)}
  >
    <Tabs.TabPane
      tab="Tab 1"
      key="1"
      disabled={boolean('Tab 1 disabled', false)}
    >
      Tab 1 Content!
    </Tabs.TabPane>
    <Tabs.TabPane
      tab="Tab 2"
      key="2"
      disabled={boolean('Tab 2 disabled', false)}
    >
      Tab 2 Content!
    </Tabs.TabPane>
  </EditableTabs>
);

export const TabsWithDropdownMenu = () => (
  <EditableTabs
    defaultActiveKey="1"
    centered={boolean('Center tabs', false)}
    fullWidth={boolean('Full width', true)}
  >
    <Tabs.TabPane
      tab={
        <>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1">Item 1</Menu.Item>
                <Menu.Item key="2">Item 2</Menu.Item>
              </Menu>
            }
          />
          Tab with dropdown menu
        </>
      }
      key="1"
      disabled={boolean('Tab 1 disabled', false)}
    >
      Tab 1 Content!
    </Tabs.TabPane>
  </EditableTabs>
);

export const Tooltip = () => (
  <AntdTooltip
    title="This is a Tooltip"
    trigger={select('Trigger', ['click', 'hover', 'focus'], 'click')}
    placement={select(
      'Placement',
      [
        'topLeft',
        'top',
        'topRight',
        'leftTop',
        'left',
        'leftBottom',
        'rightTop',
        'right',
        'rightBottom',
        'bottomLeft',
        'bottom',
        'bottomRight',
      ],
      'topLeft',
    )}
    arrowPointAtCenter={boolean('Arrow point at center', false)}
  >
    <Button>A button with tooltip</Button>
  </AntdTooltip>
);

export const StyledInfoTooltip = (args: any) => {
  const styles = {
    padding: '100px 0 0 200px',
  };

  return (
    <div style={styles}>
      <InfoTooltip tooltip="This is the text that will display!" {...args} />
    </div>
  );
};

StyledInfoTooltip.args = {
  placement: 'right',
  trigger: 'hover',
};

StyledInfoTooltip.argTypes = {
  placement: {
    name: 'Placement',
    control: {
      type: 'select',
      options: [
        'bottom',
        'left',
        'right',
        'top',
        'topLeft',
        'topRight',
        'bottomLeft',
        'bottomRight',
        'leftTop',
        'leftBottom',
        'rightTop',
        'rightBottom',
      ],
    },
  },

  trigger: {
    name: 'Trigger',
    control: {
      type: 'select',
      options: ['hover', 'click'],
    },
  },
};

export function StyledCronPicker() {
  // @ts-ignore
  const inputRef = useRef<Input>(null);
  const defaultValue = '30 5 * * 1,6';
  const [value, setValue] = useState(defaultValue);
  const customSetValue = useCallback(
    (newValue: string) => {
      setValue(newValue);
      inputRef.current?.setValue(newValue);
    },
    [inputRef],
  );
  const [error, onError] = useState<CronError>();

  return (
    <div>
      <Input
        ref={inputRef}
        onBlur={event => {
          setValue(event.target.value);
        }}
        onPressEnter={() => {
          setValue(inputRef.current?.input.value || '');
        }}
      />

      <Divider />

      <CronPicker
        clearButton={false}
        value={value}
        setValue={customSetValue}
        onError={onError}
      />

      <p style={{ marginTop: 20 }}>
        Error: {error ? error.description : 'undefined'}
      </p>
    </div>
  );
}
