const loginWith = async (page, username, password)  => {
    await page.getByRole('button', { name: 'log in' }).click()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()
  }

  const createNote = async (page, content) => {
    await page.getByRole('button', { name: 'new note' }).click()
    await page.getByRole('textbox').fill(content)
    await page.getByRole('button', { name: 'save' }).click()
    await page.getByText(content).waitFor()
  }

  const blogLoginWith = async (page, username, password)  => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()
  }
  
  export { loginWith, createNote, blogLoginWith }