import { useState } from "react";

const days = [
  {
    id: "A",
    label: "Dzień A",
    focus: "Klatka + Triceps + Barki (przód)",
    color: "#e8512a",
    exercises: [
      { name: "Wyciskanie sztangi na ławce płaskiej", sets: 4, reps: "6–8", type: "compound", muscles: { klatka: 1.0, triceps: 0.5, barki: 0.25 } },
      { name: "Wyciskanie hantli na ławce skośnej (+30°)", sets: 3, reps: "8–10", type: "compound", muscles: { klatka: 0.75, triceps: 0.25, barki: 0.25 } },
      { name: "Rozpiętki hantlami (płasko)", sets: 3, reps: "10–12", type: "isolation", muscles: { klatka: 1.0 } },
      { name: "Wyciskanie żołnierskie (OHP) ze sztangą", sets: 3, reps: "8–10", type: "compound", muscles: { barki: 1.0, triceps: 0.5 } },
      { name: "Triceps na wyciągu (linka prosta)", sets: 3, reps: "12–15", type: "isolation", muscles: { triceps: 1.0 } },
      { name: "French press (łamane) ze sztangą łamaną", sets: 3, reps: "10–12", type: "isolation", muscles: { triceps: 1.0 } },
    ],
  },
  {
    id: "B",
    label: "Dzień B",
    focus: "Plecy + Biceps + Brzuch",
    color: "#2a7ee8",
    exercises: [
      { name: "Martwy ciąg klasyczny", sets: 4, reps: "5–6", type: "compound", muscles: { plecy: 1.0, nogi: 0.5, barki: 0.25 } },
      { name: "Podciąganie na drążku (nachwyt)", sets: 4, reps: "6–8", type: "compound", muscles: { plecy: 1.0, biceps: 0.5 } },
      { name: "Wiosłowanie sztangą w opadzie", sets: 3, reps: "8–10", type: "compound", muscles: { plecy: 1.0, biceps: 0.25 } },
      { name: "Ściąganie wyciągu (undergrip)", sets: 3, reps: "10–12", type: "compound", muscles: { plecy: 0.75, biceps: 0.5 } },
      { name: "Uginanie hantli stojąc (naprzemiennie)", sets: 3, reps: "10–12", type: "isolation", muscles: { biceps: 1.0 } },
      { name: "Uginanie ze sztangą łamaną (Preacher curl)", sets: 3, reps: "10–12", type: "isolation", muscles: { biceps: 1.0 } },
      { name: "Plank", sets: 3, reps: "45 sek", type: "isolation", muscles: { brzuch: 1.0 } },
      { name: "Rollout kołem (ab wheel) / Rollout na TRX", sets: 3, reps: "10–12", type: "isolation", muscles: { brzuch: 1.0 } },
    ],
  },
  {
    id: "C",
    label: "Dzień C",
    focus: "Nogi + Barki (boczne/tył) + Brzuch",
    color: "#27a55a",
    exercises: [
      { name: "Przysiad ze sztangą (back squat)", sets: 4, reps: "6–8", type: "compound", muscles: { nogi: 1.0, barki: 0.1 } },
      { name: "Wykroki z hantlami (chodzące)", sets: 3, reps: "10/nogę", type: "compound", muscles: { nogi: 0.75 } },
      { name: "Martwy ciąg rumuński (RDL)", sets: 3, reps: "10–12", type: "compound", muscles: { nogi: 0.75, plecy: 0.25 } },
      { name: "Wspięcia na palce na maszynie (stojąc)", sets: 4, reps: "15–20", type: "isolation", muscles: { nogi: 1.0 } },
      { name: "Unoszenie hantli bokiem (lateral raise)", sets: 4, reps: "12–15", type: "isolation", muscles: { barki: 1.0 } },
      { name: "Odwrotne rozpiętki na maszynie / hantlami", sets: 3, reps: "12–15", type: "isolation", muscles: { barki: 1.0 } },
      { name: "Skręty tułowia z obciążeniem (cable/talerz)", sets: 3, reps: "15/stronę", type: "isolation", muscles: { brzuch: 1.0 } },
    ],
  },
];

const muscleGroups = ["klatka", "triceps", "plecy", "biceps", "brzuch", "nogi", "barki"];
const muscleLabels = { klatka: "Klatka", triceps: "Triceps", plecy: "Plecy", biceps: "Biceps", brzuch: "Brzuch", nogi: "Nogi", barki: "Barki" };

function calcVolume() {
  const vol = {};
  muscleGroups.forEach(m => vol[m] = 0);
  days.forEach(day => {
    day.exercises.forEach(ex => {
      Object.entries(ex.muscles).forEach(([m, coeff]) => {
        if (vol[m] !== undefined) vol[m] += ex.sets * coeff;
      });
    });
  });
  return vol;
}

const volume = calcVolume();

const techniques = [
  {
    name: "Dropset",
    icon: "📉",
    desc: "Idealne dla klatki, bicepsa i tricepsa – na ostatniej serii redukuj ciężar o 20–30% i kontynuuj do odmowy. Świetne na finisz treningu izolacyjnego. Ostrzeżenie: nie nadużywaj przy ćwiczeniach złożonych.",
    best: ["klatka", "biceps", "triceps"],
  },
  {
    name: "Back-off Set",
    icon: "🔙",
    desc: "Po ciężkich seriach roboczych (np. 4×6 na przysiadu) dodaj 1 serię z 60–70% ciężaru na 15–20 powt. Pompuje mięśnie i zwiększa całkowity volumen bez ekstremalnego zmęczenia CNS.",
    best: ["nogi", "plecy", "klatka"],
  },
  {
    name: "Ascending Pyramid",
    icon: "📈",
    desc: "Zwiększaj ciężar z każdą serią, zmniejszając liczbę powtórzeń (np. 15→12→10→6). Świetne na rozgrzewkę i pracę nad siłą. Polecane dla ćwiczeń złożonych.",
    best: ["klatka", "nogi", "plecy"],
  },
  {
    name: "Myo-Reps",
    icon: "⚡",
    desc: "Seria aktywacyjna do upadku (12–15 powt), mini-pauza 5 oddechów, potem 3–5 powt × kilka rund. Idealne dla małych grup jak barki, biceps, brzuch – ogromna efektywność przy krótkim czasie.",
    best: ["barki", "biceps", "brzuch"],
  },
];

const statusColors = { ok: "#27a55a", low: "#e8c32a", high: "#e8512a" };
function getStatus(v) {
  if (v < 10) return { label: "Za mało", color: statusColors.low, note: "Dodaj 1–2 serie izolacyjne" };
  if (v > 20) return { label: "Za dużo", color: statusColors.high, note: "Rozważ redukcję serii" };
  return { label: "Optymalny", color: statusColors.ok, note: "W normie 10–20 serii/tydz." };
}

export default function App() {
  const [activeDay, setActiveDay] = useState("A");
  const [activeTab, setActiveTab] = useState("plan");
  const currentDay = days.find(d => d.id === activeDay);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0e0e11",
      color: "#f0ede8",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      padding: "0 0 60px 0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a20 0%, #0e0e11 100%)",
        borderBottom: "1px solid #2a2a32",
        padding: "32px 24px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 0%, rgba(232,81,42,0.12) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />
        <div style={{ fontSize: 11, letterSpacing: 4, color: "#e8512a", textTransform: "uppercase", marginBottom: 8, fontFamily: "monospace" }}>
          PLAN TRENINGOWY · 178 CM · 60 KG
        </div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 900, letterSpacing: -1, lineHeight: 1.1 }}>
          3× W TYGODNIU
        </h1>
        <p style={{ margin: "8px 0 0", color: "#888", fontSize: 14, fontStyle: "italic" }}>
          Siła + Masa — Push / Pull / Legs
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 20 }}>
          {["plan", "volumen", "techniki"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              background: activeTab === tab ? "#e8512a" : "transparent",
              color: activeTab === tab ? "#fff" : "#888",
              border: `1px solid ${activeTab === tab ? "#e8512a" : "#333"}`,
              borderRadius: 4,
              padding: "7px 18px",
              cursor: "pointer",
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontFamily: "monospace",
              transition: "all 0.2s",
            }}>
              {tab === "plan" ? "📋 Plan" : tab === "volumen" ? "📊 Volumen" : "⚙️ Techniki"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px" }}>

        {/* ===== PLAN TAB ===== */}
        {activeTab === "plan" && (
          <div>
            {/* Stats bar */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, padding: "20px 0",
            }}>
              {[
                { label: "Treningi", val: "3×/tydzień" },
                { label: "System", val: "PPL Split" },
                { label: "Cel", val: "Siła & Masa" },
              ].map(s => (
                <div key={s.label} style={{
                  background: "#16161c", border: "1px solid #2a2a32", borderRadius: 8,
                  padding: "12px 10px", textAlign: "center",
                }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: "#666", letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* System note */}
            <div style={{
              background: "#16161c", border: "1px solid #e8512a30",
              borderLeft: "3px solid #e8512a",
              borderRadius: 8, padding: "14px 16px", marginBottom: 20, fontSize: 13, lineHeight: 1.7,
            }}>
              <strong style={{ color: "#e8512a" }}>Dlaczego PPL?</strong>{" "}
              Masz 3 lata stażu i przechodzisz z 1×/tydzień na 3×/tydzień — to duży skok. PPL (Push/Pull/Legs) daje każdej grupie mięśniowej{" "}
              <strong>ok. 48–72h regeneracji</strong>, nie przekracza objętości na start i pozwala progresować na wszystkich wzorcach ruchowych jednocześnie. Przy 60 kg i 178 cm priorytetem jest <strong>nabicie masy</strong>, więc ciężkie ćwiczenia złożone idą pierwsze.
            </div>

            {/* Schedule */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"].map((d, i) => {
                const dayMap = [0, null, 1, null, 2, null, null]; // Mon=A, Wed=B, Fri=C
                const di = dayMap[i];
                const dayData = di !== null ? days[di] : null;
                return (
                  <div key={d} style={{
                    flex: 1, background: dayData ? dayData.color + "20" : "#16161c",
                    border: `1px solid ${dayData ? dayData.color + "60" : "#2a2a32"}`,
                    borderRadius: 6, padding: "8px 4px", textAlign: "center",
                  }}>
                    <div style={{ fontSize: 11, color: "#888" }}>{d}</div>
                    {dayData ? (
                      <div style={{ fontSize: 13, fontWeight: 700, color: dayData.color, marginTop: 3 }}>Dzień {dayData.id}</div>
                    ) : (
                      <div style={{ fontSize: 11, color: "#444", marginTop: 3 }}>OFF</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Day selector */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {days.map(d => (
                <button key={d.id} onClick={() => setActiveDay(d.id)} style={{
                  flex: 1,
                  background: activeDay === d.id ? d.color : "#16161c",
                  color: activeDay === d.id ? "#fff" : "#888",
                  border: `1px solid ${activeDay === d.id ? d.color : "#2a2a32"}`,
                  borderRadius: 6, padding: "10px 8px",
                  cursor: "pointer", fontSize: 13, fontWeight: 700,
                  transition: "all 0.15s",
                }}>
                  Dzień {d.id}
                  <div style={{ fontSize: 10, fontWeight: 400, marginTop: 2, opacity: 0.8 }}>
                    {d.id === "A" ? "Push" : d.id === "B" ? "Pull" : "Legs"}
                  </div>
                </button>
              ))}
            </div>

            {/* Day detail */}
            <div style={{ background: "#16161c", border: `1px solid ${currentDay.color}40`, borderRadius: 10, overflow: "hidden" }}>
              <div style={{
                background: currentDay.color + "20", borderBottom: `1px solid ${currentDay.color}40`,
                padding: "14px 18px",
              }}>
                <div style={{ fontSize: 11, letterSpacing: 2, color: currentDay.color, textTransform: "uppercase", fontFamily: "monospace" }}>
                  DZIEŃ {currentDay.id}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>{currentDay.focus}</div>
              </div>

              {currentDay.exercises.map((ex, i) => (
                <div key={i} style={{
                  borderBottom: i < currentDay.exercises.length - 1 ? "1px solid #1f1f28" : "none",
                  padding: "14px 18px",
                  display: "flex", alignItems: "flex-start", gap: 14,
                }}>
                  <div style={{
                    minWidth: 32, height: 32, borderRadius: "50%",
                    background: currentDay.color + "25", border: `1px solid ${currentDay.color}50`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700, color: currentDay.color,
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.3 }}>{ex.name}</div>
                    <div style={{ marginTop: 4, display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <span style={{
                        background: "#0e0e11", border: "1px solid #333",
                        borderRadius: 4, padding: "2px 8px", fontSize: 11, color: "#aaa",
                      }}>
                        {ex.sets} serie × {ex.reps} powt.
                      </span>
                      <span style={{
                        background: ex.type === "compound" ? "#e8512a15" : "#2a7ee815",
                        border: `1px solid ${ex.type === "compound" ? "#e8512a40" : "#2a7ee840"}`,
                        borderRadius: 4, padding: "2px 8px", fontSize: 11,
                        color: ex.type === "compound" ? "#e8512a" : "#2a7ee8",
                      }}>
                        {ex.type === "compound" ? "🔗 Złożone" : "🎯 Izolacja"}
                      </span>
                    </div>
                    <div style={{ marginTop: 6, display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {Object.entries(ex.muscles).map(([m, c]) => (
                        <span key={m} style={{
                          background: "#1a1a22", border: "1px solid #2a2a35",
                          borderRadius: 3, padding: "1px 7px", fontSize: 10, color: "#999",
                        }}>
                          {muscleLabels[m]} ×{c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progression tip */}
            <div style={{
              marginTop: 16, background: "#16161c", border: "1px solid #27a55a30",
              borderLeft: "3px solid #27a55a", borderRadius: 8, padding: "12px 16px", fontSize: 13, lineHeight: 1.7,
            }}>
              <strong style={{ color: "#27a55a" }}>Progresja:</strong>{" "}
              Zwiększaj ciężar o <strong>2,5 kg</strong> gdy wykonasz górną liczbę powtórzeń w <strong>wszystkich</strong> seriach z dobrą techniką. Dla ćwiczeń izolacyjnych — skok o 1,25 kg lub 1 powtórzenie więcej. Double progression — twój główny tool.
            </div>
          </div>
        )}

        {/* ===== VOLUMEN TAB ===== */}
        {activeTab === "volumen" && (
          <div style={{ paddingTop: 20 }}>
            <p style={{ color: "#888", fontSize: 13, marginBottom: 20, lineHeight: 1.7 }}>
              Tygodniowy wolumen efektywny = Σ (serie × współczynnik zaangażowania). Cel: <strong style={{ color: "#f0ede8" }}>10–20 serii na grupę</strong> tygodniowo.
            </p>

            {muscleGroups.map(m => {
              const v = parseFloat(volume[m].toFixed(1));
              const status = getStatus(v);
              const pct = Math.min(100, (v / 20) * 100);
              return (
                <div key={m} style={{
                  background: "#16161c", border: "1px solid #2a2a32",
                  borderRadius: 8, padding: "16px 18px", marginBottom: 10,
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 700 }}>{muscleLabels[m]}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{
                        background: status.color + "20", border: `1px solid ${status.color}50`,
                        borderRadius: 4, padding: "2px 8px", fontSize: 11, color: status.color,
                      }}>
                        {status.label}
                      </span>
                      <span style={{ fontSize: 18, fontWeight: 900, color: status.color }}>{v}</span>
                    </div>
                  </div>
                  <div style={{ background: "#0e0e11", borderRadius: 4, height: 8, overflow: "hidden" }}>
                    <div style={{
                      width: `${pct}%`, height: "100%",
                      background: `linear-gradient(90deg, ${status.color}, ${status.color}99)`,
                      borderRadius: 4, transition: "width 0.3s",
                    }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                    <span style={{ fontSize: 10, color: "#555" }}>0</span>
                    <span style={{ fontSize: 10, color: "#27a55a" }}>10 (min)</span>
                    <span style={{ fontSize: 10, color: "#e8c32a" }}>15</span>
                    <span style={{ fontSize: 10, color: "#e8512a" }}>20 (max)</span>
                  </div>
                  {status.label !== "Optymalny" && (
                    <div style={{ marginTop: 8, fontSize: 12, color: status.color, fontStyle: "italic" }}>
                      → {status.note}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Summary */}
            <div style={{
              marginTop: 20, background: "#16161c", border: "1px solid #2a2a32",
              borderRadius: 10, overflow: "hidden",
            }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid #2a2a32", fontSize: 14, fontWeight: 700 }}>
                📊 Tabela zbiorcza
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#0e0e11" }}>
                    <th style={{ padding: "10px 18px", textAlign: "left", color: "#888", fontWeight: 400, fontSize: 11, letterSpacing: 1 }}>GRUPA</th>
                    <th style={{ padding: "10px 12px", textAlign: "center", color: "#888", fontWeight: 400, fontSize: 11 }}>SERIE EFF.</th>
                    <th style={{ padding: "10px 18px", textAlign: "right", color: "#888", fontWeight: 400, fontSize: 11 }}>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {muscleGroups.map((m, i) => {
                    const v = parseFloat(volume[m].toFixed(1));
                    const status = getStatus(v);
                    return (
                      <tr key={m} style={{ borderTop: "1px solid #1f1f28" }}>
                        <td style={{ padding: "10px 18px", fontWeight: 700 }}>{muscleLabels[m]}</td>
                        <td style={{ padding: "10px 12px", textAlign: "center", fontWeight: 900, color: status.color }}>{v}</td>
                        <td style={{ padding: "10px 18px", textAlign: "right", fontSize: 11, color: status.color }}>{status.label}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div style={{
              marginTop: 16, background: "#16161c", border: "1px solid #e8512a30",
              borderLeft: "3px solid #e8512a", borderRadius: 8, padding: "14px 16px", fontSize: 13, lineHeight: 1.8,
            }}>
              <strong style={{ color: "#e8512a" }}>Komentarz:</strong> Nogi i Plecy dostają najwyższy volumen — słusznie, to największe grupy napędzające masę. Biceps i triceps mieszczą się w górnej normie — luksus za darmo dzięki ćwiczeniom złożonym. Brzuch jest celowo "niżej" — działa jako stabilizator przez cały tydzień, 6 efektywnych serii izolacyjnych w zupełności wystarczy na start.
            </div>
          </div>
        )}

        {/* ===== TECHNIKI TAB ===== */}
        {activeTab === "techniki" && (
          <div style={{ paddingTop: 20 }}>
            <p style={{ color: "#888", fontSize: 13, marginBottom: 20, lineHeight: 1.7 }}>
              Techniki intensyfikacji — wdrażaj je <strong style={{ color: "#f0ede8" }}>po 4–6 tygodniach</strong> podstawowego treningu, gdy progresja liniowa zacznie zwalniać.
            </p>

            {techniques.map((t, i) => (
              <div key={i} style={{
                background: "#16161c", border: "1px solid #2a2a32",
                borderRadius: 10, padding: "18px 18px", marginBottom: 14,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 24 }}>{t.icon}</span>
                  <span style={{ fontSize: 17, fontWeight: 900 }}>{t.name}</span>
                </div>
                <p style={{ margin: "0 0 12px", fontSize: 13, lineHeight: 1.7, color: "#ccc" }}>{t.desc}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, color: "#666", letterSpacing: 1, textTransform: "uppercase" }}>Najlepiej dla:</span>
                  {t.best.map(m => (
                    <span key={m} style={{
                      background: "#0e0e11", border: "1px solid #333",
                      borderRadius: 4, padding: "2px 8px", fontSize: 11, color: "#aaa",
                    }}>
                      {muscleLabels[m]}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Final summary */}
            <div style={{
              marginTop: 8, background: "#16161c",
              border: "1px solid #2a7ee840", borderLeft: "3px solid #2a7ee8",
              borderRadius: 8, padding: "16px 18px", fontSize: 13, lineHeight: 1.9,
            }}>
              <div style={{ fontWeight: 700, color: "#2a7ee8", marginBottom: 8 }}>🎯 Podsumowanie i wnioski</div>
              <p style={{ margin: "0 0 10px" }}>
                <strong>Balans:</strong> Plan jest dobrze zbalansowany — antagoniści (klatka↔plecy, biceps↔triceps) mają zbliżony wolumen efektywny, co chroni stawy barkowe i łokciowe przed przeciążeniami.
              </p>
              <p style={{ margin: "0 0 10px" }}>
                <strong>Mocne strony:</strong> Duży udział ćwiczeń złożonych (martwy ciąg, przysiad, OHP, podciąganie) — to fundament masy przy 60 kg. Dwa ćwiczenia złożone + jedno izolacyjne na każdą dużą grupę to złoty standard.
              </p>
              <p style={{ margin: "0 0 10px" }}>
                <strong>Niedobory/uwagi:</strong> Jeśli po 8 tygodniach brzuch nadal "nie czuć" — dorzuć 2 serie spinania brzucha (cable crunch) do dnia B. Łydki (wspięcia) mają tylko 4 serie — możesz zwiększyć do 5–6, bo to wytrzymały mięsień.
              </p>
              <p style={{ margin: 0 }}>
                <strong>Kluczowe na start:</strong> Jedz <strong>nadwyżkę kaloryczną ~300–400 kcal</strong> dziennie i pilnuj min. <strong>2g białka/kg</strong> (czyli ok. 120 g/dzień). Bez tego żaden plan nie zadziała.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}