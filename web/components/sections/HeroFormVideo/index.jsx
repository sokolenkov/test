import Link from 'next/link'

import Video from '../../Video'
import Icon from '../../icons/AnimatedIcon'
import LogoStatic from '../../icons/LogoStatic'
import SponsorsBlock from '../../SponsorsBlock'
import SignMeUpForm from '../../forms/SignMeUpForm'

import {injectIconToSpanStr} from '../../../utils'

export default function HeroFormVideo({link, title, subtitle, formId, video, sponsors}) {
  return (
    <section className="hero-form-video bg-thriving pt-[170px] pb-[70px] lg:pt-6 lg:pb-[100px]">
      <div
        className="hero-form__head px-8 mx-auto mb-[90px] hidden max-h-[65px]
        w-full max-w-[calc(1288px+2rem)] items-center justify-between lg:flex"
      >
        <div className="hero-form__head-logo cursor-pointer">
          <Link href="/" passHref>
            <a className="flex">
              <LogoStatic color="#fff" />
            </a>
          </Link>
        </div>

        {link.internal ? (
          <Link href={link.url} passHref>
            <a className="hero-form__head__link cta-btn">{link.text}</a>
          </Link>
        ) : (
          <a
            className="hero-form__head__link cta-btn"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.text}
          </a>
        )}
      </div>

      <div className="container mb-8 px-2 lg:mb-[95px] lg:px-8">
        <div
          className="hero-form__body flex flex-col items-center justify-between gap-[46px]
          lg:flex-row lg:gap-0"
        >
          <div className="hero-form__body-left w-full max-w-[515px] lg:w-1/2">
            <h1
              className="hero-form__body__title heading-1 mb-4 text-center text-white
              lg:mb-6 lg:text-left"
            >
              {injectIconToSpanStr(title, () => (
                <Icon color="#FFCC7B" />
              ))}
            </h1>

            <p
              className="hero-form__body__subtitle  body-m mb-8 text-center text-white
              lg:mb-[40px] lg:text-left"
            >
              {subtitle}
            </p>

            <SignMeUpForm
              formId={formId}
              buttonText="Subscribe"
              placeholder="Enter your email"
              buttonClasses="hero-form__body-form__btn w-full cta-btn bg-black lg:w-auto"
              formClasses="max-w-[315px] flex flex-col gap-4 items-center relative mx-auto
              lg:max-w-[475px] lg:flex-row lg:gap-2 lg:mx-0"
              errorClasses="absolute top-[-21px] h-fit lg:top-[unset]"
            />
          </div>

          <div className="hero-form__body-right w-full lg:w-1/2">
            <Video video={video} />
          </div>
        </div>
      </div>

      <div className="hero-form__footer">
        <SponsorsBlock sponsors={sponsors} />
      </div>
    </section>
  )
}
