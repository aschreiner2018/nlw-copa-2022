import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	const user = await prisma.user.create({
		data: {
			name: 'Albert Schreiner',
			email: 'albert.schreiner.sage@gmail.com',
			avatarURL: 'https://github.com/aschreiner2018.png'
		}
	})

	const poll = await prisma.poll.create({
		data: {
			title: 'Example Pool',
			ownerId: user.id,
			code: 'BOL001',
			participants: {
				create: {
					userId: user.id
				}
			}
		}
	})

	await prisma.game.create({
		data: {
			date: '2022-11-04T08:00:00.960Z',
			firstTeamCountryCode: 'DE',
			secondTeamCountryCode: 'BR'
		}
	})

	await prisma.game.create({
		data: {
			date: '2022-11-05T08:00:00.960Z',
			firstTeamCountryCode: 'AR',
			secondTeamCountryCode: 'BR',
			guesses: {
				create: {
					firstTeamPoints: 1,
					secondTeamPoints: 2,

					participant: {
						connect: {
							userId_pollId: {
								pollId: poll.id,
								userId: user.id
							}
						}
					}
				}
			}
		}
	})
}

main()