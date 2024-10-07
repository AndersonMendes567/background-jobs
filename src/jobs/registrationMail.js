import mail from  '../lib/mail.js'

export default {
  key: 'registration_mail',
  options: {
    delay: 5000
  },
  async handle({ data }) {
    const { user } = data

    try {
      await mail.sendMail({
        from: 'mendesanderson567@gmail.com',
        to: `${user.email} <${user.name}>`,
        subject: 'Cadastro de usuário',
        html: `
          <div>
            <h1 style="font-family: sans-serif;">Olá ${user.name}, Bem-Vindo!</h1>
            <h3>Seu cadastro foi realizado com sucesso.</h3>
            <button>Acessar minha conta</button>
          </div>
        `
      })
    } catch (error) {
      console.log(error)
    }
  }
}