# Generated by Django 4.1.5 on 2023-05-07 17:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('wrcms', '0021_class_program'),
    ]

    operations = [
        migrations.RenameField(
            model_name='subject',
            old_name='subjectCode',
            new_name='code',
        ),
        migrations.RenameField(
            model_name='subject',
            old_name='subjectName',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='subject',
            old_name='fullMarks',
            new_name='practicalAssessment',
        ),
        migrations.RenameField(
            model_name='subject',
            old_name='passMarks',
            new_name='practicalFinal',
        ),
        migrations.RemoveField(
            model_name='subject',
            name='program',
        ),
        migrations.RemoveField(
            model_name='subject',
            name='semester',
        ),
        migrations.RemoveField(
            model_name='subject',
            name='subjectType',
        ),
        migrations.AddField(
            model_name='lecture',
            name='teacher2',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='Teacher_two', to='wrcms.teacher'),
        ),
        migrations.AddField(
            model_name='lecture',
            name='type',
            field=models.CharField(blank=True, choices=[('Theory', 'Theory'), ('Practical', 'Practical')], max_length=10, null=True),
        ),
        migrations.AddField(
            model_name='subject',
            name='theoryAssessment',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='subject',
            name='theoryFinal',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='subject',
            name='type',
            field=models.CharField(blank=True, choices=[('Theory', 'Theory'), ('Practical', 'Practical'), ('Both', 'Both')], max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='lecture',
            name='teacher',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Teacher_one', to='wrcms.teacher'),
        ),
        migrations.CreateModel(
            name='ProgramSubject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('semester', models.IntegerField()),
                ('program', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wrcms.program')),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wrcms.subject')),
            ],
        ),
        migrations.AddField(
            model_name='program',
            name='subjects',
            field=models.ManyToManyField(through='wrcms.ProgramSubject', to='wrcms.subject'),
        ),
        migrations.AddField(
            model_name='subject',
            name='programs',
            field=models.ManyToManyField(through='wrcms.ProgramSubject', to='wrcms.program'),
        ),
    ]
