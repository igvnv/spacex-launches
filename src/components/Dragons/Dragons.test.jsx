import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Dragons } from './Dragons';
import DragonInfoShort from '../DragonInfoShort';
import dragonsData from '../../../__tests__/helpers/dragons';

Enzyme.configure({ adapter: new Adapter() });

describe('Dragons', () => {
  it('displays short info about all dragons', () => {
    const wrapper = shallow(<Dragons dragons={dragonsData} />);
    expect(wrapper.find(DragonInfoShort).length).toEqual(dragonsData.length);
  });
});
