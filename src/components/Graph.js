import React, { PureComponent } from 'react';
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
// Creates customizable lettered indicators over dots in the line graph. 
class CustomizedLabel extends PureComponent {
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
  }
const getAxisYDomain = (from, to, ref, offset) => {
  const refData = initialData.slice(from - 1, to);
  let [bottom, top] = [refData[0][ref], refData[0][ref]];
  refData.forEach((d) => {
    if (d[ref] > top) top = d[ref];
    if (d[ref] < bottom) bottom = d[ref];
  });

  return [(bottom | 0) - offset, (top | 0) + offset];
};

const initialState = {
  data: initialData,
  left: 'dataMin',
  right: 'dataMax',
  refAreaLeft: '',
  refAreaRight: '',
  top: 'dataMax+1',
  bottom: 'dataMin-1',
  top2: 'dataMax+20',
  bottom2: 'dataMin-20',
  animation: true,
};

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/highlight-zomm-line-chart-v77bt';

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  zoom() {
    let { refAreaLeft, refAreaRight } = this.state;
    const { data } = this.state;

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      this.setState(() => ({
        refAreaLeft: '',
        refAreaRight: '',
      }));
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // yAxis domain
    const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'Temperature', 1);
    const [bottom2, top2] = getAxisYDomain(refAreaLeft, refAreaRight, 'Pressure', 50);

    this.setState(() => ({
      refAreaLeft: '',
      refAreaRight: '',
      data: data.slice(),
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
      bottom2,
      top2,
    }));
  }

  zoomOut() {
    const { data } = this.state;
    this.setState(() => ({
      data: data.slice(),
      refAreaLeft: '',
      refAreaRight: '',
      left: 'dataMin',
      right: 'dataMax',
      top: 'dataMax+1',
      bottom: 'dataMin',
      top2: 'dataMax+50',
      bottom2: 'dataMin+50',
    }));
  }

  render() {
    const { data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2 } = this.state;

    return (
      <div className="highlight-bar-charts" style={{ userSelect: 'none', width: '100%' }}>
        {/* <h2>Demo Graph of Pressure and Temperature with Respect to T in a zoomable format</h2> */}
        <button type="button" className="button" onClick={this.zoomOut.bind(this)}> Zoom Out </button>

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
            onMouseDown={(e) => this.setState({ refAreaLeft: e.activeLabel })}
            onMouseMove={(e) => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel })}
            // eslint-disable-next-line react/jsx-no-bind
            onMouseUp={this.zoom.bind(this)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis allowDataOverflow dataKey="name" domain={[left, right]}  type="number" />
            <YAxis allowDataOverflow domain={[bottom, top]} type="number" yAxisId="1" />
            <YAxis orientation="right" allowDataOverflow domain={[bottom2, top2]} type="number" yAxisId="2" />
            <Tooltip />
            <Legend />
            <Line yAxisId="1" type="natural" dataKey="Temperature" stroke="#8884d8" animationDuration={300} />
            <Line yAxisId="2" type="natural" dataKey="Pressure" stroke="#82ca9d" animationDuration={300} />

            {refAreaLeft && refAreaRight ? (
              <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

