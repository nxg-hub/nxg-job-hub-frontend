class User {
  constructor({
    id,
    email,
    firstName,
    lastName,
    password,
    phone,
    gender,
    dob,
    roles,
    nationality,
    profilePicture,
    userType
  }) {
    this.id = id;
    this.email = email;
    this.firstName = firstName
    this.lastName = lastName
    this.password = password;
    this.phoneNumber = phone;
    this.gender = gender.toUpperCase();
    this.dateOfBirth = dob;
    this.roles = roles || " "
    this.nationality = nationality || " "
    this.profilePicture = profilePicture || " "
    this.userType = userType
  }
}
export default User;
