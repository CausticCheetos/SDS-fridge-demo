import { useState, useEffect} from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
  Label
} from 'recharts';
import api from '../services/api'

const Graph = ({filtered, filtered2, rangeValues, setChannels, channels, selectedChannel}) => {

const [data, setData] = useState([])
/* const [group, setGroup] = useState([]) */

const getData = () =>{
  api.getRTP().then((a) => setData(a))
} 

useEffect(()=>{
  const interval = setInterval(() => {
      getData();
      let unique = [...new Set(data.map(a => a.id))]
      
      //Are channels always the same???
      if (channels.toString() !== unique.sort().toString()) {
        setChannels(unique.sort())
      }

      /* setGroup(groupBy(data, 'id')) */

  }, 1000)
  return () => clearInterval(interval)
}, [data])


const newData = filtered.filter(filter => filter.dataState)
const newData2 = filtered2.filter(filter => filter.dataState)
const [zoomAmount, setZoomAmount] = useState('')
const [left, setLeft] = useState('dataMin')
const [right, setRight] = useState('dataMax')
const [refAreaLeft, setRefAreaLeft] = useState('')
const [refAreaRight, setRefAreaRight] = useState('')
const [top, setTop] = useState('dataMax')
const [bottom, setBottom] = useState('dataMin')

const UNIXConvert = (unix) => {
  const time = new Date(unix).toLocaleString('en-AU')
  return time
}

/* //Sorting function
const groupBy = (arr, key) => {
  return arr.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}; */

//Second Y-Axis
const [top2, setTop2] = useState('dataMax')
const [bottom2, setBottom2] = useState('dataMin')

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
  setRefAreaLeft("");
  setRefAreaRight("");
  setLeft("dataMin");
  setRight("dataMax");
  setTop("dataMax+" + zoomAmount);
  setBottom("dataMin-" + zoomAmount);
  setTop2("dataMax+" + zoomAmount);
  setBottom2("dataMin-" + zoomAmount);
};

const zoomHandle = (e) => {
  setZoomAmount(Number(e.target.value))
}

useEffect(() => {
  if(rangeValues !== undefined) {
  const newLeft = Date.parse(rangeValues[0])
  const newRight = Date.parse(rangeValues[1])
  const newTop = rangeValues[3]
  const newBot = rangeValues[2]

  setLeft(newLeft)
  setRight(newRight)
  setTop(parseFloat(newTop))
  setBottom(parseFloat(newBot))
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [rangeValues])

  return (
    <div
      style={{ userSelect: 'none', width: '100%' }} >
      
      <div className='zoomContainer'>
        <button type="button" className="button" onClick={() => zoomOut()}> Zoom Out </button>
      </div>

      <ResponsiveContainer width="100%" height={600}>
        <LineChart
          width={800}
          height={400}
          margin={{
              top: 20,
              left: 30,
              bottom: 5,
            }}
          onMouseDown={(e) => { if(e) setRefAreaLeft(e.activeLabel) }}
          onMouseMove={(e) => { if(e) setRefAreaRight( e.activeLabel) }}
          onMouseUp={zoom}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            allowDataOverflow 
            dataKey="date" 
            domain={[left, right]} 
            type="number" 
            scale="time" 
            tickFormatter={UNIXConvert}
            tick={{ angle: -25 }}
            textAnchor="end" 
            height={100}
            // change tick intervals
            /* interval={0} */
            />
          <YAxis 
            allowDataOverflow domain={[bottom, top]} 
            type="number" 
            yAxisId="1"
            width={100}
            dataKey={"power"}
          />
          <YAxis 
            orientation="right" 
            allowDataOverflow domain={[bottom2, top2]} 
            type="number" 
            yAxisId="2"
            width={100}
          />
          <Tooltip labelFormatter={(value) => new Date(value).toLocaleString('en-AU', {timeZone: "Australia/Sydney", timeZoneName: "short"})}/>
          <Legend />
          {newData.map(filter => 
            <Line 
              yAxisId="1" 
              type="linear" 
              data={data.filter(obj => 
                ((selectedChannel?.[0]?.filter(obj => obj.state))?.map(obj => obj.name))?.includes(obj.id)
             )}
              dataKey={filter.dataName} 
              animationDuration={300}
              stroke={filter.colour}
              strokeWidth={2}/>
            )}
          {newData2.map(filter => 
            <Line 
              yAxisId="2" 
              type="linear"
              data={data.filter(obj => 
                ((selectedChannel?.[1]?.filter(obj => obj.state))?.map(obj => obj.name))?.includes(obj.id)
             )}
              dataKey={filter.dataName} 
              animationDuration={300}
              stroke={filter.colour}
              strokeWidth={2}/>
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

