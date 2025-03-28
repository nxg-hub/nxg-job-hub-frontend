export default function Register() {
  return (
    <div className="w-full bg-red-500">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-[750px] rounded-b-lg shadow-md">
          <section>
            <h1>Let's get you started!</h1>
            <p>Get started and connect to different professionals.</p>
          </section>
          <form action="">
            <div>
              <section>
                <label htmlFor="fname">First name</label>
                <input
                  type="text"
                  name="firstname"
                  id="fname"
                />
              </section>
              <section>
                <label htmlFor="lname">Last name</label>
                <input
                  type="text"
                  name="lastname"
                  id="lname"
                />
              </section>
            </div>
            <div>
              <label htmlFor="phone">Phone number</label>
              <input
                type="text"
                name="phone_num"
                id="phone"
              />
            </div>
            <div>
              <label htmlFor="mail">E-mail address</label>
              <input
                type="email"
                name="email"
                id="mail"
              />
            </div>
            <div>
              <label htmlFor="pass">Password</label>
              <input
                type="password"
                name="password"
                id="pass"
              />
            </div>
            <div>
              <label htmlFor="repass">Retype</label>
              <input
                type="password"
                name="repeatpass"
                id="repass"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
