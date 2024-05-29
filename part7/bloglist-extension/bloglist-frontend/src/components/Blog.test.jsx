import { render, screen , waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Me',
  }

  const { container } = render(<Blog blog={blog} />)

  screen.debug()

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  const urlElement = screen.queryByText('URL:')
  const likesElement = screen.queryByText('Likes:')
  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Me',
    url: 'testUrl',
    likes: 0,
    user: [{ name: 'Test User', username: 'testuser' }]
  }

  const loggedInUser = { name: 'Test User', username: 'testuser' }

  render(<Blog blog={blog} loggedInUser={loggedInUser} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const urlElement = await screen.findByText(blog.url)
  const likesElement = await screen.findByText(`Likes: ${blog.likes}`)
  const userNameElement = screen.getByText('User Name: Test User')

  expect(urlElement).toBeInTheDocument()
  expect(likesElement).toBeInTheDocument()
  expect(userNameElement).toBeInTheDocument()
})

test('clicking the button twice calls event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Me',
    url: 'testUrl',
    likes: 0,
    user: [{ name: 'Test User', username: 'testuser' }]
  }

  const loggedInUser = { name: 'Test User', username: 'testuser' }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} loggedInUser={loggedInUser} handleLike={mockHandler}/>)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  await waitFor(() => {
    const likeButton = screen.queryByText('like')
    if (likeButton) {
      user.click(likeButton)
      user.click(likeButton)
    }
  })

  expect(mockHandler.mock.calls).toHaveLength(1)

})
