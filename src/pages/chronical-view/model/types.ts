export interface HistoricalEvent {
  date: string
  description: string
}

export interface HistoricalPeriod {
  title: string
  events: HistoricalEvent[]
}

export interface RotationState {
  angle: number
  currentIndex: number
  rotationTime: number
}