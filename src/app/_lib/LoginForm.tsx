const LoginForm = () => {
  return (
    <form action="/login" method="POST"  className="flex flex-col  border-2 h-1/2 p-8 gap-5  m-4 max-w-96 rounded-xl bg-slate-500">
        <div>
          <label htmlFor="uname">Username: </label>
          <input type="text" name="username" id="uname" className="w-32 bg-slate-800 rounded-lg p-2 box-border" placeholder="username"/>
        </div>
        <div>
          <label htmlFor="pwd">Password: </label>
          <input type="password" name="password" id="pwd" className="w-32 bg-slate-800 rounded-lg p-2 box-border" placeholder="password" />
        </div>
        <button type="submit">Log in</button>
    </form>
  )
}

export default LoginForm