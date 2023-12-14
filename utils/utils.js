
export function validateParams(...params) {
  for (let i = 0; i < params.length; i++) {
    const param = params[i];

    if (param === null || param === undefined || param === '') {
      return `Error: Field ${fields[i]} is empty and mandatory. Please provide a valid value.`;
    }
  }
}
export const fields = ['Full Name', 'Email', 'User Name', 'Gender', 'Role', 'Phone', 'Password']