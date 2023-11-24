class User {
  constructor({
    email,
    name,
    password,
    phone,
    gender,
    dob,
    roles,
    nationality,
  }) {
    this.email = email;
    this.firstName = name.split(" ")[0];
    this.lastName = name.split(" ").slice(-1)[0];
    this.password = password;
    this.phoneNumber = phone;
    this.gender = gender.toUpperCase();
    this.dateOfBirth = dob;
    this.roles = roles || " "
    this.nationality = nationality || " "
  }
}
export default User;
