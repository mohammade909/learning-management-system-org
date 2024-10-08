export function getAllDatesOfMonth(month, year) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dates = [];
  for (let day = 0; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    dates.push(date);
  }
  const monthName = monthNames[month];

  return { dates, monthName };
}

export function convertToMySQLDateFormat(dateString) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function navigationFilter(navigations, userPermissions, ...entity) {
  navigations.filter((navItem) => {
    const permissionKey = navItem.name.toLowerCase().replace(" ", "");

    const permissionsString = userPermissions[permissionKey];
    if (permissionsString) {
      try {
        const permissions = JSON.parse(permissionsString);
        return Array.isArray(permissions) && permissions.includes(entity);
      } catch (e) {
        console.error(`Error parsing permissions for ${permissionKey}:`, e);
        return false;
      }
    }
    return false;
  });
}
