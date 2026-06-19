import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { cn } from '@/lib/utils';

export function Sheet({ children, open, onOpenChange }) {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50 lg:hidden" onClose={onOpenChange}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pe-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-200"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-200"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-[320px]">
                                    {children}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export function SheetContent({ children, className }) {
    return (
        <div
            className={cn(
                'flex h-full flex-col border-r border-slate-200 bg-white shadow-xl',
                className,
            )}
        >
            {children}
        </div>
    );
}
