"""empty message

Revision ID: 25243e00764d
Revises: beb834be1d2a
Create Date: 2024-01-07 09:58:57.214149

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '25243e00764d'
down_revision = 'beb834be1d2a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('testing')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('testing',
    sa.Column('name', mysql.VARCHAR(length=10), nullable=True),
    sa.Column('email', mysql.VARCHAR(length=10), nullable=True),
    sa.Column('username', mysql.VARCHAR(length=10), nullable=True),
    sa.Column('password', mysql.VARCHAR(length=10), nullable=True),
    sa.Column('api_key', mysql.VARCHAR(length=10), nullable=True),
    sa.Column('user_id', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('manger_id', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('emp_id', mysql.INTEGER(), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('emp_id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    # ### end Alembic commands ###
