import { daysOfTheWeek } from './generate-metatada'

/**
 * Verifica se o array contém todos os dias da semana.
 */
function isAllDays(days: string[]): boolean {
  return days.length === daysOfTheWeek.length &&
    daysOfTheWeek.every(day => days.includes(day))
}

/**
 * Verifica se o array contém exatamente o fim de semana (Sábado e Domingo).
 */
function isWeekend(days: string[]): boolean {
  const weekend = new Set(['Sábado', 'Domingo'])
  const daysSet = new Set(days)
  if (daysSet.size !== weekend.size) return false
  return [...daysSet].every(day => weekend.has(day))
}

/**
 * Verifica se os índices dos dias são consecutivos na semana.
 */
function areConsecutive(indices: number[]): boolean {
  if (indices.length <= 1) return true
  const sorted = [...indices].sort((a, b) => a - b)
  return sorted.every((num, i, arr) => i === 0 || num === arr[i - 1] + 1)
}

/**
 * Verifica se todos os dias de segunda a sexta estão presentes
 */
function isAllWeekdays(days: string[]): boolean {
  const weekdays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']
  return days.length === weekdays.length &&
    weekdays.every(day => days.includes(day))
}

/**
 * Verifica se a sequência atravessa a semana (ex: Sábado, Domingo, Segunda)
 */
function crossesWeek(days: string[]): boolean {
  if (days.length < 3) return false
  
  if (isAllWeekdays(days)) return false
  
  const indices = days.map(day => daysOfTheWeek.indexOf(day as typeof daysOfTheWeek[number]))
  
  const hasWeekend = indices.some(i => i === 6)
  const hasEarlyWeek = indices.some(i => i <= 2)
  
  return hasWeekend && hasEarlyWeek
}

/**
 * Formata um array de dias para uma string legível.
 */
export function formatDays(days: string[]): string {
  if (days.length === 0) return ''
  if (days.length === 1) return days[0]

  if (isAllDays(days)) return 'Todos os dias'
  if (isWeekend(days)) return 'Fim de semana'

  if (crossesWeek(days)) {
    if (days.length === 2) {
      return `${days[0]} e ${days[1]}`
    }
    return days.join(', ')
  }

  const orderedDays = daysOfTheWeek.filter(day => days.includes(day))

  if (isAllWeekdays(orderedDays)) {
    return 'Segunda a Sexta'
  }

  const dayIndices = orderedDays.map(day => daysOfTheWeek.indexOf(day))
  const consecutive = areConsecutive(dayIndices)

  if (consecutive && orderedDays.length > 2) {
    return `${orderedDays[0]} a ${orderedDays[orderedDays.length - 1]}`
  }

  if (consecutive && orderedDays.length === 2) {
    return `${orderedDays[0]},  ${orderedDays[1]}`
  }

  if (orderedDays.length === 2) {
    return `${orderedDays[0]} e ${orderedDays[1]}`
  }

  return orderedDays.join(', ')
}
