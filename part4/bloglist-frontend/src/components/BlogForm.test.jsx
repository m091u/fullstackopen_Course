import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')

  const sendButton = screen.getByText('Create')

  await user.type(inputs[0], 'Testing a blog title...')
  await user.type(inputs[1], 'Test Author')
  await user.type(inputs[2], 'http://test-url.com')

  await user.click(sendButton)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'Testing a blog title...',
    author: 'Test Author',
    url: 'http://test-url.com',
  })

})