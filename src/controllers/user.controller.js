import queue from "../queue.js"

export async function createUserController(req, res) {
  const user = {
    name: 'Anderson',
    email: 'mendesanderson567@gmail.com'
  }

  await queue.add('registration_mail', { user })

  res.status(200).json({
    success: true
  })
}