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

// React Class Components not recommended to be used! Changing to use functional components instead
// https://react.dev/reference/react/PureComponent

/* const initialData = [
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
]; */
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

const Graph = ({filtered, rangeValues}) => {

  const [data, setData] = useState([
    { name: 1, Resistance: 4.11, Temperature: -100, Flow: 200, 'Pressure 1': 80, 'Pressure 2': 120, Turbo: 1},
    { name: 2, Resistance: 2.39, Temperature: -120, Flow: 210, 'Pressure 1': 100, 'Pressure 2': 120, Turbo: 5},
    { name: 3, Resistance: 1.37, Temperature: -140, Flow: 220, 'Pressure 1': 50, 'Pressure 2': 120, Turbo: 7},
    { name: 4, Resistance: 1.16, Temperature: -150, Flow: 230, 'Pressure 1': 200, 'Pressure 2': 120, Turbo: 10},
    { name: 5, Resistance: 2.29, Temperature: -160, Flow: 240, 'Pressure 1': 20, 'Pressure 2': 120, Turbo: 50},
  ])

  const newData = filtered.filter(filter => filter.dataState)
  const [left, setLeft] = useState('dataMin')
  const [right, setRight] = useState('dataMax')
  const [refAreaLeft, setRefAreaLeft] = useState('')
  const [refAreaRight, setRefAreaRight] = useState('')
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

  useEffect(() => {
    const newLeft = parseFloat(rangeValues[0])
    const newRight = parseFloat(rangeValues[1])

    setLeft(newLeft)
    setRight(newRight)
    console.log(left, right);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rangeValues])

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

