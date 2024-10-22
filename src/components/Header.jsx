import React, { useEffect, useState } from "react";

export function Header({ score, record }) {
  return (
    <header>
      <div className="title">
        <h1>Memory Card</h1>
      </div>
      <div className="score">
        <div className="bestScore"> RECORD = {record}</div>
        <div className="actualScore">SCORE = {score}</div>
      </div>
    </header>
  );
}
