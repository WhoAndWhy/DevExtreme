import { appointmentCollectorData } from './init/widget.data';
import { createScheduler } from './init/widget.setup';
import url from '../../../helpers/getPageUrl';
import Scheduler from '../../../model/scheduler';

fixture `Drag-and-drop behaviour for the appointment tooltip`
    .page(url(__dirname, '../../container.html'));

test("Drag-n-drop between a scheduler table cell and the appointment tooltip", async t => {
    const scheduler = new Scheduler("#container");
    const appointment = scheduler.getAppointment("Approve Personal Computer Upgrade Plan");
    const collector = scheduler.getAppointmentCollector("2");
    const appointmentTooltip = scheduler.appointmentTooltip;
    const appointmentTooltipItem = appointmentTooltip.getListItem("Approve Personal Computer Upgrade Plan");

    await t
        .click(collector.element)
        .expect(appointmentTooltip.isVisible()).ok()
        .dragToElement(appointmentTooltipItem.element, scheduler.getDateTableCell(2, 5))
        .expect(appointmentTooltipItem.element.exists).notOk()
        .expect(appointment.element.exists).ok()
        .expect(appointment.size.height).eql("100px")
        .expect(appointment.date.time).eql("10:00 AM - 11:00 AM")
        .dragToElement(appointment.element, scheduler.getDateTableCell(2, 2))
        .click(collector.element)
        .expect(appointmentTooltip.isVisible()).ok()
        .expect(appointment.element.exists).notOk()

}).before(() => createScheduler({
    views: ["week"],
    currentView: "week",
    dataSource: appointmentCollectorData,
    maxAppointmentsPerCell: 2,
    width: 1000
}));

test("Drag-n-drop in same table cell", async t => {
    const scheduler = new Scheduler("#container");
    const collector = scheduler.getAppointmentCollector("2");
    const appointmentTooltip = scheduler.appointmentTooltip;
    const appointmentTooltipItem = appointmentTooltip.getListItem("Approve Personal Computer Upgrade Plan");

    await t
        .click(collector.element)
        .expect(appointmentTooltip.isVisible()).ok()
        .drag(appointmentTooltipItem.element, 0, -50)
        .click(collector.element)
        .expect(appointmentTooltip.isVisible()).ok()

}).before(() => createScheduler({
    views: ["week"],
    currentView: "week",
    dataSource: appointmentCollectorData,
    maxAppointmentsPerCell: 2,
    width: 1000
}));
