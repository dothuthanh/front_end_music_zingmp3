export class SignUpInfo {
  // name: string;
  username: string;
  email: string;
  role: string[];
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  // name: string,
  constructor(username: string, email: string, password: string, firstName: string, lastName: string,
              phoneNumber: string) {
    // this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = ['user'];
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
  }
}
