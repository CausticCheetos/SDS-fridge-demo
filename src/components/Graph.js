import { useState, useEffect } from 'react';
import {
  /* Label, */
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from 'recharts';

const Graph = ({filtered, rangeValues}) => {

  const [data, setData] = useState([
    { name: 1, Resistance: 4.11, Temperature: -100, Flow: 200, 'Pressure 1': 80, 'Pressure 2': 80, Turbo: 1},
    { name: 2, Resistance: 2.39, Temperature: -120, Flow: 210, 'Pressure 1': 100, 'Pressure 2': 90, Turbo: 5},
    { name: 3, Resistance: 1.37, Temperature: -140, Flow: 220, 'Pressure 1': 50, 'Pressure 2': 100, Turbo: 7},
    { name: 4, Resistance: 1.16, Temperature: -150, Flow: 230, 'Pressure 1': 200, 'Pressure 2': 110, Turbo: 10},
    { name: 5, Resistance: 2.29, Temperature: -160, Flow: 240, 'Pressure 1': 20, 'Pressure 2': 120, Turbo: 50},
    { name: 6, Resistance: 4.2, Temperature: -160, Flow: 240, 'Pressure 1': 20, 'Pressure 2': 130, Turbo: 50},
    { name: 7, Resistance: 3.56, Temperature: -160, Flow: 240, 'Pressure 1': 300, 'Pressure 2': 140, Turbo: 50},
    { name: 8, Resistance: 3.28, Temperature: -160, Flow: 240, 'Pressure 1': 150, 'Pressure 2': 150, Turbo: 50},
    { name: 9, Resistance: 5.3, Temperature: -160, Flow: 240, 'Pressure 1': 500, 'Pressure 2': 160, Turbo: 50},
    { name: 10, Resistance: 1.34, Temperature: -160, Flow: 240, 'Pressure 1': 700, 'Pressure 2': 170, Turbo: 50},
    { name: 11, Resistance: 2.79, Temperature: -160, Flow: 240, 'Pressure 1': 600, 'Pressure 2': 180, Turbo: 50},
  ])

  const newData = filtered.filter(filter => filter.dataState)
  const [left, setLeft] = useState('dataMin')
  const [right, setRight] = useState('dataMax')
  const [refAreaLeft, setRefAreaLeft] = useState('')
  const [refAreaRight, setRefAreaRight] = useState('')
  const [top, setTop] = useState('dataMax+20')
  const [bottom, setBottom] = useState('dataMin-20')


  const [scrollIn, setScrollIn] = useState(0)


  //Second Y-Axis
  const [top2, setTop2] = useState('dataMax+20')
  const [bottom2, setBottom2] = useState('dataMin-20')
  
 /*  const [animation, setAnimation] = useState(true) */

  const zoom = () => {
    let _refAreaLeft = refAreaLeft;
    let _refAreaRight = refAreaRight;
    let _data = data;

    if (_refAreaLeft === _refAreaRight || _refAreaRight === '') {
      setRefAreaLeft("");
      setRefAreaRight("");
      return;
    }

    // xAxis domain
    if (_refAreaLeft > _refAreaRight) {
      setRefAreaLeft(_refAreaRight);
      setRefAreaRight(_refAreaLeft);
    }

    setRefAreaLeft("");
    setRefAreaRight("");
    setData(_data.slice());
    setLeft(_refAreaLeft);
    setRight(_refAreaRight);
  }

  const zoomOut = () => {
    var _data = data;
    setData(_data.slice());
    setRefAreaLeft("");
    setRefAreaRight("");
    setLeft("dataMin");
    setRight("dataMax");
    setTop("dataMax+20");
    setBottom("dataMin-20");
    setTop2("dataMax+20");
    setBottom2("dataMin-20");
    setScrollIn(0);
  };

  const scrollDetect = (e) => {
    const range = data.length
    if (e.deltaY < 0) {
      setScrollIn(scrollIn + 0.1)
      if (scrollIn > 0) {
      setLeft('dataMin-'.concat(scrollIn + 0.1))
      setRight('dataMax+'.concat(scrollIn + 0.1))
      } else {
        setLeft(data[0].name - (scrollIn + 0.1))
        setRight(range + (scrollIn + 0.1))
      }
    } else {
      setScrollIn(scrollIn - 0.1)
      if (scrollIn > 0) {
        setLeft('dataMin-'.concat(scrollIn - 0.1))
        setRight('dataMax+'.concat(scrollIn - 0.1))
      } else {
        setLeft(data[0].name + (scrollIn - 0.1)*-1)
        setRight(range - (scrollIn - 0.1)*-1)
      }
    }
  }

  useEffect(() => {
    const newLeft = parseFloat(rangeValues[0])
    const newRight = parseFloat(rangeValues[1])

    setLeft(newLeft)
    setRight(newRight)
    console.log(left, right);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rangeValues])

    return (
      <div className="highlight-bar-charts" 
        style={{ userSelect: 'none', width: '100%' }} 
        onWheel={scrollDetect}>
        <button type="button" className="button" onClick={() => zoomOut()}> Zoom Out </button>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            width={800}
            height={400}
            data={data}
            margin={{
                top: 20,
                right: 30,
                left: 30,
                bottom: 5,
              }}
            onMouseDown={(e) => { setRefAreaLeft(e.activeLabel) }} //TODO prevent refArea being set to null when user selects labels
            onMouseMove={(e) => { setRefAreaRight( e.activeLabel) }}
            onMouseUp={zoom}
            
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis allowDataOverflow dataKey="name" domain={[left, right]}  type="number" />
            <YAxis allowDataOverflow domain={[bottom, top]} type="number" yAxisId="1" />
            <YAxis orientation="right" allowDataOverflow domain={[bottom2, top2]} type="number" yAxisId="2" />
            <Tooltip />
            <Legend />
            {newData.map(filter => 
              <Line yAxisId="1" type="natural" dataKey={filter.dataName} stroke="#8884d8" animationDuration={300} />
              )}
          
            {refAreaLeft && refAreaRight ? (
              <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
}

export default Graph

