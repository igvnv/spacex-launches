import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Payloads, { optionData, PayloadOption } from './Payloads';

Enzyme.configure({ adapter: new Adapter() });

const payloads = {
  option_1: 'dragon',
  option_2: 'composite fairing',
  composite_fairing: {
    height: {
      meters: 13.1,
      feet: 43,
    },
    diameter: {
      meters: 5.2,
      feet: 17.1,
    },
  },
};

describe('RocketInfo - Payloads', () => {
  describe('optionData method', () => {
    it('returns option data by its name', () => {
      expect(optionData('composite fairing', payloads)).toEqual(payloads.composite_fairing);
    });

    it('returns NULL when option data is not found', () => {
      expect(optionData('dragon', payloads)).toEqual(null);
    });
  });

  describe('PayloadOption component', () => {
    it('displays payload name', () => {
      const wrapper = shallow(<PayloadOption name="Dragon" />);
      expect(wrapper.contains(<dt>Name</dt>)).toEqual(true);
      expect(wrapper.contains(<dd>Dragon</dd>)).toEqual(true);
    });

    it('does not display payload height when data is empty', () => {
      const wrapper = shallow(<PayloadOption name="Dragon" />);
      expect(wrapper.contains(<dt>Height</dt>)).toEqual(false);
    });

    it('does not display payload diameter when data is empty', () => {
      const wrapper = shallow(<PayloadOption name="Dragon" />);
      expect(wrapper.contains(<dt>Diameter</dt>)).toEqual(false);
    });

    it('displays payload height when data is set', () => {
      const wrapper = shallow(<PayloadOption name="Dragon" data={payloads.composite_fairing} />);
      expect(wrapper.contains(<dt>Height</dt>)).toEqual(true);
      expect(wrapper.contains(<dd>13.1 meters</dd>)).toEqual(true);
    });

    it('displays payload diameter when data is set', () => {
      const wrapper = shallow(<PayloadOption name="Dragon" data={payloads.composite_fairing} />);
      expect(wrapper.contains(<dt>Diameter</dt>)).toEqual(true);
      expect(wrapper.contains(<dd>5.2 meters</dd>)).toEqual(true);
    });
  });

  it('displays all payload options', () => {
    const wrapper = shallow(<Payloads data={payloads} />);
    expect(wrapper.find(PayloadOption).length).toEqual(2);
  });
});
