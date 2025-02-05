import React from 'react'
import Barchart from './BarChart'
import { Wrapper } from '../assets/wrappers/ChartsContainer';

const ChartsContainer = ({ data }) => {  
    return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <Barchart data={data}/>
    </Wrapper>
  )
}

export default ChartsContainer