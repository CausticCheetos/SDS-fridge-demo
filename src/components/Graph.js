import { useState } from 'react';
import {
  Label,
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

// React Class Components not recommended to be used! Changing to use functional components instead
// https://react.dev/reference/react/PureComponent

const initialData = [
  { name: 1, Temperature: 4.11, Pressure: 100 },
  { name: 2, Temperature: 2.39, Pressure: 120 },
  { name: 3, Temperature: 1.37, Pressure: 150 },
  { name: 4, Temperature: 1.16, Pressure: 180 },
  { name: 5, Temperature: 2.29, Pressure: 200 },
  { name: 6, Temperature: 3, Pressure: 499 },
  { name: 7, Temperature: 2.53, Pressure: 110 },
  { name: 8, Temperature: 2.52, Pressure: 100 },
  { name: 9, Temperature: 1.79, Pressure: 200 },
  { name: 10, Temperature: 2.94, Pressure: 222 },
  { name: 11, Temperature: 4.3, Pressure: 210 },
  { name: 12, Temperature: 4.41, Pressure: 300 },
  { name: 13, Temperature: 2.1, Pressure: 50 },
  { name: 14, Temperature: 8, Pressure: 190 },
  { name: 15, Temperature: 0, Pressure: 300 },
  { name: 16, Temperature: 9, Pressure: 400 },
  { name: 17, Temperature: 3, Pressure: 200 },
  { name: 18, Temperature: 2, Pressure: 50 },
  { name: 19, Temperature: 3, Pressure: 100 },
  { name: 20, Temperature: 7, Pressure: 100 },
  { name: 21, Temperature: 2.94, Pressure: 222 },
  { name: 22, Temperature: 4.3, Pressure: 210 },
  { name: 23, Temperature: 4.41, Pressure: 300 },
  { name: 24, Temperature: 2.1, Pressure: 50 },
  { name: 25, Temperature: 8, Pressure: 190 },
  { name: 26, Temperature: 0, Pressure: 300 },
  { name: 27, Temperature: 9, Pressure: 400 },
  { name: 28, Temperature: 3, Pressure: 200 },
  { name: 29, Temperature: 2, Pressure: 50 },
  { name: 30, Temperature: 3, Pressure: 100 },
  { name: 31, Temperature: 7, Pressure: 100 },
];
// Unused?
// Creates customizable lettered indicators over dots in the line graph. 
/* class CustomizedLabel extends PureComponent {
    render() {

        
      const { x, y, stroke, value } = this.props;
  
      return (
        <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
          {value}
        </text>
      );
    }
  }
  // Creates customizable text at the bottom of the graph describing what data values are being checked
  class CustomizedAxisTick extends PureComponent {
    render() {
      const { x, y, stroke, payload } = this.props;
  
      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
            {payload.value}
          </text>
        </g>
      );
    }
  } */ 


//??????????????????

/* const getAxisYDomain = (from, to, ref, offset) => {
  const refData = initialData.slice(from - 1, to);
  let [bottom, top] = [refData[0][ref], refData[0][ref]];
  refData.forEach((d) => {
    if (d[ref] > top) top = d[ref];
    if (d[ref] < bottom) bottom = d[ref];
  });

  return [(bottom | 0) - offset, (top | 0) + offset];
}; */

const Graph = () => {

  const [data, setData] = useState(initialData)
  const [left, setLeft] = useState('dataMin')
  const [right, setRight] = useState('dataMax')
  const [refAreaLeft, setRefAreaLeft] = useState('')
  const [refAreaRight, setRefAreaRight] = useState('refAreaRight')
  const [top, setTop] = useState('dataMax+1')
  const [bottom, setBottom] = useState('dataMin-1')
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

    //???????????????????
    /* // yAxis domain
    setBottom(getAxisYDomain(_refAreaLeft, _refAreaRight, "Temperature", 1));
    setBottom2(getAxisYDomain(_refAreaLeft, _refAreaRight, "Pressure", 50 )); */

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
    setTop("dataMax+1");
    setBottom("dataMin-1");
    setTop2("dataMax+20");
    setBottom2("dataMin-20");
  };

    return (
      <div className="highlight-bar-charts" style={{ userSelect: 'none', width: '100%' }}>
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
            onMouseDown={(e) => { setRefAreaLeft(e.activeLabel) }}
            onMouseMove={(e) => { setRefAreaRight( e.activeLabel) }}
            onMouseUp={zoom}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis allowDataOverflow dataKey="name" domain={[left, right]}  type="number" />
            <YAxis allowDataOverflow domain={[bottom, top]} type="number" yAxisId="1" />
            <YAxis orientation="right" allowDataOverflow domain={[bottom2, top2]} type="number" yAxisId="2" />
            <Tooltip />
            <Legend />
            <Line yAxisId="1" type="natural" dataKey="Temperature" stroke="#8884d8" animationDuration={300} />
            <Line yAxisId="2" type="natural" dataKey="Pressure" stroke="#82ca9d" animationDuration={300} />
            <Line yAxisId="2" type="natural" dataKey="Pressure1" stroke="#82ca9d" animationDuration={300} />

            {refAreaLeft && refAreaRight ? (
              <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
}

export default Graph

