import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { SkillType } from "../../App";



type ChartProps = {
  data: SkillType[];
};

function Chart({ data }: ChartProps) {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {


    const usedPoints = 100 - data.reduce((acc,skill)=> acc + skill.points,0)

    console.log(usedPoints)

    const usedData = [...data, {skill:'total', points: usedPoints}]
    //svg container
    const w = 200;
    const h = 200;
    const radius = w / 2;
    const innerRadius = radius - 10;
    const svg = d3.select(chartRef.current).attr("width", w).attr("height", h);

    //center svg
    const g = svg
      .append("g")
      .attr("transform", `translate(${w / 2}, ${h / 2})`);

    //generating chart
    const chartData = d3.pie().value((d: SkillType) => d.points)(usedData);
    const chartArc = d3
      .arc()
      .cornerRadius(10)
      .padAngle(0.1)
      .innerRadius(innerRadius)
      .outerRadius(radius);
    const chartColors = d3.scaleOrdinal().range(d3.schemeSet2);

    //mapping svg
    g.selectAll()
      .data(chartData)
      .join("path")
      .attr("d", chartArc)
      .attr("fill", (d) => chartColors(d.value));
  }, []);

  return (
    <div>
      <svg ref={chartRef}></svg>
    </div>
  );
}

export default Chart;
