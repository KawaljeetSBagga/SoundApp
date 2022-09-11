export type MusicType = 'guitar' | null;

export type MusicStatus = 'playing' | 'not_playing'

export type DownloadStatus = 'downloaded' | 'in_progress' | 'not_started'

export type FileMaster = {
  music: {
    path: string,
    type: MusicType,
    status: MusicStatus
  },
  download: {
    progress: number;
    status: DownloadStatus;
  }
}