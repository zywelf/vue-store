import { ref } from 'vue'

type Theme = 'light' | 'dark'

const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem('theme')
  return saved === 'dark' ? 'dark' : 'light'
}

const theme = ref<Theme>(getInitialTheme())

const applyTheme = () => {
  if (theme.value === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

applyTheme()

export const useTheme = () => {
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
    applyTheme()
  }

  return { theme, toggleTheme }
}
