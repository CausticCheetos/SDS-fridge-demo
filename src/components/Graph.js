import { useState, useEffect} from 'react';
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
import api from '../services/api'

const Graph = ({filtered, rangeValues}) => {
// { name: 1, Resistance: 4.11, Temperature: -100, Flow: 200, 'Pressure 1': 80, 'Pressure 2': 80, Turbo: 1},

const [data, setData] = useState([])

 const getData = () =>{
    api.getRTP().then((data) => setData(data))
  } 
  //TODO Add delay by minute intervals
  useEffect(()=>{
    const interval = setInterval(() => {
        getData();
    }, 5000)
    return () => clearInterval(interval)
  }, [])
  

  const newData = filtered.filter(filter => filter.dataState)
  const [left, setLeft] = useState('dataMin')
  const [right, setRight] = useState('dataMax')
  const [refAreaLeft, setRefAreaLeft] = useState('')
  const [refAreaRight, setRefAreaRight] = useState('')
  const [top, setTop] = useState('dataMax+50')
  const [bottom, setBottom] = useState('dataMin-50')


  const [scrollIn, setScrollIn] = useState(0)
 
  const UNIXConvert = (unix) => {
    const time = new Date(unix).toLocaleString('en-AU')
    return time
  }

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
    setTop("dataMax+50");
    setBottom("dataMin-50");
    setTop2("dataMax+50");
    setBottom2("dataMin-50");
    setScrollIn(0);
  };

  const scrollDetect = (e) => {
    const range = data

    /* if (e.deltaY < 0) {
      setScrollIn(scrollIn + 0.1)
      if (scrollIn > 0) {
      setLeft('dataMin-'.concat(scrollIn + 0.1))
      setRight('dataMax+'.concat(scrollIn + 0.1))
      } else {
        setLeft(data[0].id - (scrollIn + 0.1))
        setRight(range + (scrollIn + 0.1))
      }
    } else {
      setScrollIn(scrollIn - 0.1)
      if (scrollIn > 0) {
        setLeft('dataMin-'.concat(scrollIn - 0.1))
        setRight('dataMax+'.concat(scrollIn - 0.1))
      } else {
        setLeft(data[0].id + (scrollIn - 0.1)*-1)
        setRight(range - (scrollIn - 0.1)*-1)
      }
    } */
  }

  useEffect(() => {
    const newLeft = Date.parse(rangeValues[0])
    const newRight = Date.parse(rangeValues[1])

    console.log(newLeft);
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
            onMouseDown={(e) => { if(e) setRefAreaLeft(e.activeLabel) }}
            onMouseMove={(e) => { if(e) setRefAreaRight( e.activeLabel) }}
            onMouseUp={zoom}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis allowDataOverflow dataKey="date" domain={[left, right]} type="number" scale="time" tickFormatter={UNIXConvert}/>
            <YAxis allowDataOverflow domain={[bottom, top]} type="number" yAxisId="1" />
            <YAxis orientation="right" allowDataOverflow domain={[bottom2, top2]} type="number" yAxisId="2" />
            <Tooltip labelFormatter={(value) => new Date(value).toLocaleString('en-AU', {timeZone: "Australia/Sydney", timeZoneName: "short"})}/>
            <Legend />
            {newData.map(filter => 
              <Line yAxisId="1" type="natural" dataKey={filter.dataName} stroke={filter.colour} animationDuration={300} />
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

