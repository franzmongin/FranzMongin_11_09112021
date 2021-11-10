export async function fetchUserData(id) {
  let data = await fetch(`http://localhost:3000/user/${id}`);
  return await data.json();
}

export async function fetchActivityData(id) {
  let data = await fetch(`http://localhost:3000/user/${id}/activity`);
  return await data.json();
}

export async function fetchAverageSessionsData(id) {
  let data = await fetch(`http://localhost:3000/user/${id}/average-sessions`);
  return await data.json();
}
export async function fetchPerformanceData(id) {
  let data = await fetch(`http://localhost:3000/user/${id}/performance`);
  return await data.json();
}
