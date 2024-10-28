async function sanitizeCurrentUnit(unit) {
  return {
    ID: unit.id,
    Name: unit.name,
    Description: unit.description,
    "Min. Required Age": unit.age,
    "Wood Cost": unit?.cost?.Wood ?? 0,
    "Food Cost": unit?.cost?.Food ?? 0,
    "Gold Cost": unit?.cost?.Gold ?? 0,
    "Build Time": unit.build_time,
    "Reload Time": unit.reload_time,
    "Hit Points": unit.hit_points,
    Attack: unit.attack,
    Accuracy: unit.accuracy,
  };
}

export { sanitizeCurrentUnit };