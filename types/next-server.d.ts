declare module 'next/server' {
  export const NextResponse: {
    json(body: any, init?: any): any
    redirect?(url: string, init?: any): any
  }
  export type NextRequest = any
}
