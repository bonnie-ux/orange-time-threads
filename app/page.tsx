"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [rotation, setRotation] = useState(0);
  const [number, setNumber] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [history, setHistory] = useState<number[]>([]);

  const drawNumber = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    const result = Math.floor(Math.random() * 100) + 1;

    // 每個號碼 3.6 度
    const targetAngle = result * 3.6;

    // 多轉幾圈
    const extraSpins = 360 * 8;

    const finalRotation = rotation + extraSpins + targetAngle;

    setRotation(finalRotation);

    setTimeout(() => {
      setNumber(result);
      setHistory((prev) => [result, ...prev].slice(0, 10));
      setIsSpinning(false);
    }, 4500);
  };

  useEffect(() => {
    document.body.style.margin = "0";
  }, []);

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #fff5e7 0%, #ffd6a0 50%, #f47b20 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "40px",
          gap: "40px",
        }}
      >
        {/* LEFT */}
        <div
          style={{
            flex: 1,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: 900,
              color: "#4a250f",
              marginBottom: "10px",
            }}
          >
            橘時咖啡
          </div>

          <div
            style={{
              fontSize: "90px",
              fontWeight: 900,
              color: "#f47b20",
              lineHeight: 1,
            }}
          >
            今天你喊號
          </div>

          <div
            style={{
              marginTop: "20px",
              fontSize: "28px",
              color: "#4a250f",
              fontWeight: 700,
            }}
          >
            晚上轉到你，這單我們請
          </div>

          {/* WHEEL */}
          <div
            style={{
              position: "relative",
              width: "520px",
              height: "520px",
              margin: "40px auto",
            }}
          >
            {/* pointer */}
            <div
              style={{
                position: "absolute",
                top: "-20px",
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "25px solid transparent",
                borderRight: "25px solid transparent",
                borderTop: "50px solid #f47b20",
                zIndex: 10,
              }}
            />

            {/* wheel */}
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                border: "12px solid #fff",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                position: "relative",
                transition:
                  "transform 4.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)",
                transform: `rotate(${rotation}deg)`,

                background: `
                  conic-gradient(
                    #ffe08b 0deg 36deg,
                    #ffc2df 36deg 72deg,
                    #bce8ff 72deg 108deg,
                    #b8e8a6 108deg 144deg,
                    #ffd29a 144deg 180deg,
                    #f9e6b0 180deg 216deg,
                    #d7b7ff 216deg 252deg,
                    #afe5f2 252deg 288deg,
                    #ffb0a5 288deg 324deg,
                    #fff0a6 324deg 360deg
                  )
                `,
              }}
            >
              {[...Array(10)].map((_, i) => {
                const angle = i * 36;

                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: `
                        rotate(${angle}deg)
                        translateY(-200px)
                        rotate(-${angle}deg)
                      `,
                      transformOrigin: "center",
                      fontWeight: 900,
                      fontSize: "32px",
                      color: "#4a250f",
                    }}
                  >
                    {(i + 1) * 10}
                  </div>
                );
              })}

              {/* center */}
              <div
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "50%",
                  background: "#fff",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  fontWeight: 900,
                  color: "#f47b20",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                }}
              >
                <div style={{ fontSize: "22px" }}>1 - 100</div>
                <div style={{ fontSize: "32px" }}>轉號碼</div>
              </div>
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={drawNumber}
            disabled={isSpinning}
            style={{
              border: "none",
              background: "#f47b20",
              color: "#fff",
              fontSize: "32px",
              fontWeight: 900,
              padding: "18px 50px",
              borderRadius: "999px",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            }}
          >
            {isSpinning ? "轉盤中..." : "開始轉盤"}
          </button>
        </div>

        {/* RIGHT */}
        <div
          style={{
            width: "400px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* rules */}
          <div
            style={{
              background: "#fffaf1",
              borderRadius: "30px",
              padding: "30px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                fontSize: "34px",
                fontWeight: 900,
                color: "#f47b20",
                marginBottom: "20px",
              }}
            >
              活動規則
            </div>

            <div style={{ fontSize: "22px", lineHeight: 1.8 }}>
              💬 留言 1～100 任一數字
              <br />
              ☝️ 每人限留言一次
              <br />
              🧡 轉到你，1000元內橘時請
              <br />
              📱 中獎需出示本人帳號
            </div>
          </div>

          {/* result */}
          <div
            style={{
              background: "#4a250f",
              color: "#fff",
              borderRadius: "30px",
              padding: "40px",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                fontSize: "30px",
                fontWeight: 900,
              }}
            >
              今晚號碼
            </div>

            <div
              style={{
                fontSize: "120px",
                fontWeight: 900,
                marginTop: "20px",
                color: "#ffc247",
              }}
            >
              {number ?? "?"}
            </div>

            <div
              style={{
                marginTop: "10px",
                fontSize: "22px",
              }}
            >
              看看今天誰不用付錢 ☕
            </div>
          </div>

          {/* history */}
          <div
            style={{
              background: "#fffaf1",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: 900,
                marginBottom: "14px",
                color: "#f47b20",
              }}
            >
              最近號碼
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {history.map((n, i) => (
                <div
                  key={i}
                  style={{
                    background: "#ffe5c2",
                    padding: "10px 16px",
                    borderRadius: "999px",
                    fontWeight: 900,
                    fontSize: "20px",
                  }}
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
                }
