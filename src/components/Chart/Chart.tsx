import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import type { SkillType } from "../../App";
import './Chart.scss'

type ChartProps = {
  data: SkillType[];
  points: number
};

function Chart({ data,points }: ChartProps) {
  const chartRef = useRef<SVGSVGElement | null>(null);
  useEffect(() => {


    const availablePoints = 40 - data.reduce((acc,skill)=> acc + skill.points,0)
    const usedData = [...data, {skill:'total', points: availablePoints}]
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
      .innerRadius(innerRadius)
      .outerRadius(radius);
    const chartColors = d3.scaleOrdinal<string>().domain(data.map((d)=> d.skill)).range(d3.schemeSet2);

    //mapping svg
    g.selectAll()
      .data(chartData)
      .join("path")
      .attr("d", chartArc)
      .attr("fill", (d) =>
  d.data.skill === "total" ? "#ccc" : chartColors(d.data.skill));
  }, [data]);

  return (
    <div className="chart">
      <svg ref={chartRef}></svg>
      <div className="chart_available">
        <p>Available points</p>
        <p>{points} / 40</p>
      </div>
    </div>
  );
}

export default Chart;
